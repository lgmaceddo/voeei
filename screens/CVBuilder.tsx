
import React, { useState, useRef, useEffect } from 'react';
import { User, CVData, Experience, Education, ExtraCourse } from '../types';
import {
  FileText, ArrowLeft, ChevronRight, Plus, Trash2, Printer,
  User as UserIcon, Briefcase, GraduationCap, Sparkles, LayoutTemplate, MapPin, Mail, Phone, Linkedin, Globe, Check, Camera, Upload, X, Plane, Eye, RefreshCw, Loader2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { extractDataFromCV } from '../services/geminiService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CVBuilderProps {
  user: User;
  onBack: () => void;
}

const steps = [
  { id: 1, title: 'Dados Pessoais & Docs', icon: UserIcon },
  { id: 2, title: 'Experiência', icon: Briefcase },
  { id: 3, title: 'Formação & Cursos', icon: GraduationCap },
  { id: 4, title: 'Visualizar e Baixar', icon: Printer },
];

// --- HELPER FUNCTIONS & MASKS ---

const toUpperCase = (val: string) => val ? val.toUpperCase() : '';

const toTitleCase = (val: string) => {
  if (!val) return '';
  return val.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

const toSentenceCase = (val: string) => {
  if (!val) return '';
  return val.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
};

const formatPhone = (val: string) => {
  if (!val) return '';
  const v = val.replace(/\D/g, '').substring(0, 11);
  if (v.length > 10) return `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
  if (v.length > 6) return `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6)}`;
  if (v.length > 2) return `(${v.substring(0, 2)}) ${v.substring(2)}`;
  return v;
};

const formatCEP = (val: string) => {
  if (!val) return '';
  const v = val.replace(/\D/g, '').substring(0, 8);
  if (v.length > 5) return `${v.substring(0, 5)}-${v.substring(5)}`;
  return v;
};

const formatHeight = (val: string) => {
  if (!val) return '';
  const v = val.replace(/\D/g, '').substring(0, 3);
  if (v.length >= 2) return `${v[0]},${v.substring(1)} m`;
  return v;
};

const formatWeight = (val: string) => {
  if (!val) return '';
  const v = val.replace(/\D/g, '').substring(0, 3);
  if (v.length > 0) return `${v} kg`;
  return v;
};

const formatNumeric = (val: string) => val ? val.replace(/\D/g, '') : '';

const formatDateMask = (val: string) => {
  if (!val) return '';
  const v = val.replace(/\D/g, '').substring(0, 8);
  if (v.length > 4) return `${v.substring(0, 2)}/${v.substring(2, 4)}/${v.substring(4)}`;
  if (v.length > 2) return `${v.substring(0, 2)}/${v.substring(2)}`;
  return v;
};

const formatYear = (val: string) => {
  if (!val) return '';
  if (val.toLowerCase().includes('a') && 'atual'.startsWith(val.toLowerCase())) return 'Atual';
  return val.replace(/\D/g, '').substring(0, 4);
}

// --- SMART COMPONENTS ---

interface SmartInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  mask?: (val: string) => string;
  transform?: (val: string) => string;
  maxLength?: number;
}

const SmartInput: React.FC<SmartInputProps> = ({
  label, value, onChange, placeholder, type = "text", mask, transform, maxLength
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let val = e.target.value;
    if (mask) val = mask(val);
    onChange(val);
  };

  const handleBlur = () => {
    if (transform && value) {
      onChange(transform(value));
    }
  };

  const isTextarea = type === 'textarea';

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {isTextarea ? (
        <textarea
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white resize-none h-24"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
    </div>
  );
};

const Select = ({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: string[] }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    <div className="relative">
      <select
        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white appearance-none cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Selecione</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const CVBuilder: React.FC<CVBuilderProps> = ({ user, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'minimal'>('minimal');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  // Initial State Data
  const initialData: CVData = {
    photo: '',
    fullName: toUpperCase(user.name),
    role: 'Comissário de Voo',
    email: user.email,
    phone: '',
    address: '',
    city: '',
    zip: '',
    linkedin: '',

    nationality: 'Brasileiro',
    birthPlace: '',
    maritalStatus: 'Solteiro(a)',
    birthDate: '',
    height: '',
    weight: '',

    canac: '',
    cmaCode: '',
    cma: '',
    cmaValidity: '',
    passport: '',
    passportValidity: '',

    summary: '',
    experiences: [],
    education: [],
    extraCourses: [],
    skills: [],
    languages: []
  };

  const [cvData, setCvData] = useState<CVData>(initialData);

  // Local state for Language Adder & Nationality Logic
  const [newLang, setNewLang] = useState('');
  const [newLangLevel, setNewLangLevel] = useState('');
  const [isOtherNationality, setIsOtherNationality] = useState(false);

  // --- PERSISTENCE ---

  useEffect(() => {
    const savedData = localStorage.getItem('cv_builder_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setCvData({ ...initialData, ...parsed });
        if (parsed.nationality && parsed.nationality !== 'Brasileiro') {
          setIsOtherNationality(true);
        }
      } catch (e) {
        console.error("Failed to load CV data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cv_builder_data', JSON.stringify(cvData));
  }, [cvData]);

  const handleClearData = () => {
    if (window.confirm("Tem certeza que deseja limpar todos os dados do currículo?")) {
      setCvData(initialData);
      localStorage.removeItem('cv_builder_data');
      setCurrentStep(1);
    }
  };

  // --- HANDLERS ---

  const handleInputChange = (field: keyof CVData, value: any) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const handleNationalityChange = (val: string) => {
    if (val === 'Outra') {
      setIsOtherNationality(true);
      handleInputChange('nationality', '');
    } else {
      setIsOtherNationality(false);
      handleInputChange('nationality', val);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setCvData(prev => ({ ...prev, photo: '' }));
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert("Por favor, selecione um arquivo PDF.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];

        try {
          const extractedData = await extractDataFromCV(base64String);
          setCvData(prev => {
            const newData = { ...prev, ...extractedData };
            if (prev.photo) newData.photo = prev.photo;
            const ensureIds = (arr: any[]) => arr ? arr.map((item: any) => ({ ...item, id: item.id || Date.now().toString() + Math.random() })) : [];
            newData.experiences = ensureIds(newData.experiences);
            newData.education = ensureIds(newData.education);
            newData.extraCourses = ensureIds(newData.extraCourses);
            return newData;
          });
          alert("Dados importados com sucesso! Verifique e edite conforme necessário.");
        } catch (error) {
          console.error(error);
          alert("Ocorreu um erro ao processar o PDF. Tente novamente.");
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (e) {
      setIsAnalyzing(false);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setCvData(prev => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setCvData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({ ...prev, experiences: prev.experiences.filter(exp => exp.id !== id) }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      year: ''
    };
    setCvData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id: string) => {
    setCvData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };

  const addExtraCourse = () => {
    const newCourse: ExtraCourse = {
      id: Date.now().toString(),
      name: '',
      institution: '',
      year: ''
    };
    setCvData(prev => ({ ...prev, extraCourses: [...prev.extraCourses, newCourse] }));
  };

  const updateExtraCourse = (id: string, field: keyof ExtraCourse, value: string) => {
    setCvData(prev => ({
      ...prev,
      extraCourses: prev.extraCourses.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  };

  const removeExtraCourse = (id: string) => {
    setCvData(prev => ({ ...prev, extraCourses: prev.extraCourses.filter(c => c.id !== id) }));
  };

  const addLanguage = () => {
    if (newLang && newLangLevel) {
      const langString = `${newLang} – ${newLangLevel}`;
      setCvData(prev => ({ ...prev, languages: [...prev.languages, langString] }));
      setNewLang('');
      setNewLangLevel('');
    }
  };

  const removeLanguage = (lang: string) => {
    setCvData(prev => ({ ...prev, languages: prev.languages.filter(l => l !== lang) }));
  };

  const handleDownloadPDF = async () => {
    if (!cvRef.current) return;

    setIsGeneratingPDF(true);

    try {
      // Create a temporary container to render the CV for capture
      // This ensures we capture it at full scale regardless of the preview scale
      const element = cvRef.current;

      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Curriculo_${cvData.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Erro ao gerar PDF. Tente usar a função de impressão do navegador.");
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // --- RENDER STEPS ---

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative group mx-auto sm:mx-0">
                <div className="w-32 h-[142px] bg-slate-200 rounded-xl overflow-hidden flex items-center justify-center border-2 border-slate-300 shadow-inner">
                  {cvData.photo ? <img src={cvData.photo} alt="Preview" className="w-full h-full object-cover" /> : <UserIcon className="w-12 h-12 text-slate-400" />}
                </div>
                {cvData.photo ? (
                  <button onClick={removePhoto} className="absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full shadow-md hover:bg-rose-600 transition-colors"><X className="w-4 h-4" /></button>
                ) : (
                  <div className="absolute -bottom-2 -right-2">
                    <div className="relative inline-block">
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className="bg-indigo-600 text-white p-2 rounded-full shadow hover:bg-indigo-700 cursor-pointer"><Camera className="w-4 h-4" /></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="font-bold text-slate-700 border-b border-slate-100 pb-2">Identificação</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SmartInput label="Nome Completo" value={cvData.fullName} onChange={(v) => handleInputChange('fullName', v)} transform={toUpperCase} />
                  <SmartInput label="Cargo Alvo" value={cvData.role} onChange={(v) => handleInputChange('role', v)} transform={toTitleCase} placeholder="Ex: Comissário de Voo" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-4">Contato e Endereço</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2"><SmartInput label="Endereço (Rua, Nº, Apto)" value={cvData.address} onChange={(v) => handleInputChange('address', v)} transform={toTitleCase} /></div>
                <SmartInput label="Cidade / Estado" value={cvData.city} onChange={(v) => handleInputChange('city', v)} transform={toTitleCase} />
                <SmartInput label="CEP" value={cvData.zip} onChange={(v) => handleInputChange('zip', v)} mask={formatCEP} placeholder="00000-000" />
                <SmartInput type="tel" label="Telefone" value={cvData.phone} onChange={(v) => handleInputChange('phone', v)} mask={formatPhone} placeholder="(00) 00000-0000" />
                <SmartInput type="email" label="E-mail" value={cvData.email} onChange={(v) => handleInputChange('email', v)} />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-4">Dados Pessoais (Aviação)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="w-full">
                  {isOtherNationality ? <SmartInput label="Nacionalidade" value={cvData.nationality} onChange={(v) => handleInputChange('nationality', v)} transform={toTitleCase} /> : <Select label="Nacionalidade" value={cvData.nationality === 'Brasileiro' ? 'Brasileiro' : 'Outra'} onChange={handleNationalityChange} options={['Brasileiro', 'Outra']} />}
                </div>
                <SmartInput label="Naturalidade" value={cvData.birthPlace} onChange={(v) => handleInputChange('birthPlace', v)} transform={toTitleCase} />
                <Select label="Estado Civil" value={cvData.maritalStatus} onChange={(v) => handleInputChange('maritalStatus', v)} options={['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União Estável']} />
                <SmartInput label="Data Nascimento" value={cvData.birthDate} onChange={(v) => handleInputChange('birthDate', v)} mask={formatDateMask} placeholder="DD/MM/AAAA" />
                <SmartInput label="Altura (m)" value={cvData.height} onChange={(v) => handleInputChange('height', v)} mask={formatHeight} placeholder="1,75 m" />
                <SmartInput label="Peso (kg)" value={cvData.weight} onChange={(v) => handleInputChange('weight', v)} mask={formatWeight} placeholder="70 kg" />
              </div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 border-b border-indigo-200 pb-2 mb-4 flex items-center gap-2"><Plane className="w-4 h-4" /> Documentação Obrigatória</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <SmartInput label="Código CANAC" value={cvData.canac} onChange={(v) => handleInputChange('canac', v)} mask={formatNumeric} />
                <SmartInput label="Cód. CMA" value={cvData.cmaCode} onChange={(v) => handleInputChange('cmaCode', v)} transform={toUpperCase} />
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  <Select label="CMA (Classe)" value={cvData.cma} onChange={(v) => handleInputChange('cma', v)} options={['1ª Classe', '2ª Classe']} />
                  <SmartInput label="Validade CMA" value={cvData.cmaValidity} onChange={(v) => handleInputChange('cmaValidity', v)} mask={formatDateMask} placeholder="DD/MM/AAAA" />
                </div>
                <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SmartInput label="Nº Passaporte" value={cvData.passport} onChange={(v) => handleInputChange('passport', v)} transform={toUpperCase} />
                  <SmartInput label="Validade Passaporte" value={cvData.passportValidity} onChange={(v) => handleInputChange('passportValidity', v)} mask={formatDateMask} placeholder="DD/MM/AAAA" />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div><SmartInput type="textarea" label="Objetivo Profissional" value={cvData.summary} onChange={(v) => handleInputChange('summary', v)} transform={toSentenceCase} placeholder="Ex: Atuar como Comissário de Voo..." /></div>
            <div className="h-px bg-slate-200"></div>
            <div className="flex items-center justify-between"><h2 className="text-xl font-bold text-slate-800">Experiência Profissional</h2><Button type="button" onClick={addExperience} variant="secondary" className="text-sm py-2"><Plus className="w-4 h-4 mr-2" /> Adicionar</Button></div>
            <div className="space-y-6">
              {cvData.experiences.map((exp, idx) => (
                <div key={exp.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                  <h3 className="font-bold text-slate-400 text-xs uppercase mb-4">Experiência {idx + 1}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <SmartInput label="Empresa" value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} transform={toUpperCase} />
                    <SmartInput label="Cargo" value={exp.role} onChange={(v) => updateExperience(exp.id, 'role', v)} transform={toUpperCase} />
                    <SmartInput label="Início" value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} mask={formatYear} maxLength={4} placeholder="2024" />
                    <SmartInput label="Fim" value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} mask={formatYear} maxLength={5} placeholder="2025 ou Atual" />
                  </div>
                  <div><SmartInput type="textarea" label="Atividades" value={exp.description} onChange={(v) => updateExperience(exp.id, 'description', v)} transform={toSentenceCase} /></div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4"><div className="flex items-center justify-between"><h2 className="text-xl font-bold text-slate-800">Formação Acadêmica</h2><Button type="button" onClick={addEducation} variant="secondary" className="text-sm py-2"><Plus className="w-4 h-4 mr-2" /> Adicionar</Button></div>{cvData.education.map((edu, idx) => (<div key={edu.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative flex flex-col md:flex-row gap-4 items-start"><button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button><div className="flex-1 w-full"><SmartInput label="Instituição" value={edu.institution} onChange={(v) => updateEducation(edu.id, 'institution', v)} transform={toUpperCase} /></div><div className="flex-1 w-full"><SmartInput label="Grau / Curso" value={edu.degree} onChange={(v) => updateEducation(edu.id, 'degree', v)} transform={toTitleCase} /></div><div className="w-32"><SmartInput label="Ano" value={edu.year} onChange={(v) => updateEducation(edu.id, 'year', v)} mask={formatYear} maxLength={5} placeholder="Ex: 2024" /></div></div>))}</div>
            <div className="space-y-4"><div className="flex items-center justify-between"><h2 className="text-xl font-bold text-slate-800">Cursos Extras Curriculares</h2><Button type="button" onClick={addExtraCourse} variant="secondary" className="text-sm py-2"><Plus className="w-4 h-4 mr-2" /> Adicionar</Button></div>{cvData.extraCourses.map((course, idx) => (<div key={course.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative flex flex-col md:flex-row gap-4 items-start"><button onClick={() => removeExtraCourse(course.id)} className="absolute top-2 right-2 text-slate-400 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button><div className="flex-[2] w-full"><SmartInput label="Nome do Curso" value={course.name} onChange={(v) => updateExtraCourse(course.id, 'name', v)} transform={toUpperCase} /></div><div className="flex-1 w-full"><SmartInput label="Instituição" value={course.institution} onChange={(v) => updateExtraCourse(course.id, 'institution', v)} transform={toUpperCase} /></div><div className="w-32"><SmartInput label="Ano" value={course.year} onChange={(v) => updateExtraCourse(course.id, 'year', v)} mask={formatYear} maxLength={5} /></div></div>))}</div>
            <div className="h-px bg-slate-200 my-6"></div>
            <div className="space-y-4"><h2 className="text-xl font-bold text-slate-800">Habilidades e Idiomas</h2><div className="bg-slate-50 p-6 rounded-2xl border border-slate-200"><label className="block text-sm font-medium text-slate-700 mb-2">Adicionar Idioma</label><div className="flex flex-col md:flex-row gap-4 mb-4"><div className="flex-1"><Select label="Idioma" value={newLang} onChange={setNewLang} options={['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Italiano', 'Libras']} /></div><div className="flex-1"><Select label="Nível" value={newLangLevel} onChange={setNewLangLevel} options={['Básico', 'Intermediário', 'Avançado', 'Fluente']} /></div><div className="flex items-end"><Button onClick={addLanguage} disabled={!newLang || !newLangLevel} className="h-[46px]"><Plus className="w-4 h-4" /></Button></div></div><div className="flex flex-wrap gap-2">{cvData.languages.map(lang => (<div key={lang} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">{lang}<button onClick={() => removeLanguage(lang)} className="text-slate-400 hover:text-rose-500"><X className="w-3 h-3" /></button></div>))}{cvData.languages.length === 0 && <span className="text-slate-400 text-sm italic">Nenhum idioma adicionado.</span>}</div></div></div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3"><div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><LayoutTemplate className="w-5 h-5" /></div><div><h3 className="font-bold text-indigo-900">Escolha o Modelo</h3><p className="text-xs text-indigo-600">Selecione o estilo ideal para seu perfil.</p></div></div>
              <div className="flex gap-2">{['classic', 'modern', 'minimal'].map((t) => (<button key={t} onClick={() => setSelectedTemplate(t as any)} className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all border-2 ${selectedTemplate === t ? 'border-indigo-600 bg-white text-indigo-600' : 'border-transparent bg-indigo-100 text-indigo-500 hover:bg-indigo-200'}`}>{t}</button>))}</div>
            </div>
            <div className="flex-1 bg-slate-200 rounded-xl overflow-auto p-4 md:p-8 flex justify-center border border-slate-300 shadow-inner">
              <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-screen origin-top transform scale-[0.5] md:scale-[0.6] lg:scale-[0.7] transition-transform duration-300">
                {selectedTemplate === 'modern' && <TemplateModern data={cvData} />}
                {selectedTemplate === 'classic' && <TemplateClassic data={cvData} />}
                {selectedTemplate === 'minimal' && <TemplateMinimal data={cvData} />}
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <>
      <style>{`@media print { @page { margin: 0; size: 210mm 297mm; } body * { visibility: hidden; } #cv-print-area, #cv-print-area * { visibility: visible; } #cv-print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; background: white; min-height: 100vh; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } nav, aside, button, header { display: none !important; } }`}</style>
      {isAnalyzing && (<div className="fixed inset-0 z-[80] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center animate-fade-in"><div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm"><div className="relative"><div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin"></div><div className="absolute inset-0 flex items-center justify-center"><Sparkles className="w-6 h-6 text-indigo-600" /></div></div><div><h3 className="text-xl font-bold text-slate-800">Analisando PDF</h3><p className="text-slate-500 mt-2">A IA está lendo seu currículo...</p></div></div></div>)}

      {/* PDF Generation Overlay */}
      {isGeneratingPDF && (
        <div className="fixed inset-0 z-[80] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center animate-fade-in text-center">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6 max-w-sm mx-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-primary-50 border-t-primary-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Printer className="w-8 h-8 text-primary-500" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Gerando PDF</h3>
              <p className="text-slate-500 font-bold mt-2">Renderizando seu currículo em alta definição...</p>
            </div>
          </div>
        </div>
      )}

      {/* Hidden container for PDF capture (Ensures 1:1 scale and high quality) */}
      <div className="fixed left-[-9999px] top-0 pointer-events-none">
        <div ref={cvRef} style={{ width: '210mm', minHeight: '297mm', background: 'white' }}>
          {selectedTemplate === 'modern' && <TemplateModern data={cvData} />}
          {selectedTemplate === 'classic' && <TemplateClassic data={cvData} />}
          {selectedTemplate === 'minimal' && <TemplateMinimal data={cvData} />}
        </div>
      </div>

      <div className="max-w-5xl mx-auto pb-20 print:hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="bg-white p-2 rounded-full shadow-sm hover:bg-slate-50 border border-slate-100">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Criador de Currículo</h1>
              <p className="text-slate-500 text-sm">Monte um CV profissional padrão aviação.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <input type="file" accept=".pdf" onChange={handlePdfUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200" title="Importar PDF via IA">
                <Sparkles className="w-4 h-4 mr-2" /> Importar PDF
              </Button>
            </div>
            <Button onClick={handleClearData} variant="ghost" className="text-rose-500 hover:bg-rose-50 px-2" title="Limpar Tudo">
              <Trash2 className="w-5 h-5" />
            </Button>
            {currentStep === 4 && (
              <>
                <Button onClick={() => setIsPreviewOpen(true)} variant="secondary" className="hidden md:flex">
                  <Eye className="w-4 h-4 mr-2" /> Visualizar
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                >
                  {isGeneratingPDF ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Printer className="w-4 h-4 mr-2" />}
                  Baixar PDF
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                return (
                  <button key={step.id} onClick={() => setCurrentStep(step.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-1 ${isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${isActive ? 'bg-indigo-600 text-white' : isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                    </div>
                    <span className="text-sm">{step.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-9">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[500px] flex flex-col">
              <div className="flex-1">
                {renderStepContent()}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
                <Button variant="ghost" onClick={() => setCurrentStep(p => Math.max(1, p - 1))} disabled={currentStep === 1}>
                  Voltar
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={() => setCurrentStep(p => Math.min(4, p + 1))}>
                    Próximo <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={() => setIsPreviewOpen(true)} variant="secondary">
                      <Eye className="w-4 h-4 mr-2" /> Visualizar
                    </Button>
                    <Button
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPDF}
                      className="bg-indigo-600"
                    >
                      {isGeneratingPDF ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Printer className="w-4 h-4 mr-2" />}
                      Baixar PDF
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const formatDate = (dateStr: string) => { if (!dateStr) return ''; try { if (dateStr.includes('/')) return dateStr; const [y, m, d] = dateStr.split('-'); if (!y || !m || !d) return dateStr; return `${d}/${m}/${y}`; } catch (e) { return dateStr; } };

// --- REDESIGNED CLASSIC TEMPLATE ---
const TemplateClassic = ({ data }: { data: CVData }) => (
  <div className="w-full h-auto min-h-screen bg-white text-slate-900 font-serif leading-relaxed p-12 flex flex-col print:p-0">

    {/* HEADER SECTION */}
    <div className="flex flex-col items-center border-b-2 border-slate-900 pb-8 mb-10">
      <h1 className="text-4xl font-bold uppercase tracking-widest text-slate-900 mb-2 text-center">
        {data.fullName}
      </h1>
      <p className="text-xl italic text-slate-700 mb-4 font-medium">{data.role}</p>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-700">
        {data.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            <span>{data.email}</span>
          </div>
        )}
        {data.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>{data.phone}</span>
          </div>
        )}
        {data.city && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{data.address}, {data.city}</span>
          </div>
        )}
      </div>
    </div>

    <div className="flex flex-row gap-10 flex-1">

      {/* --- MAIN COLUMN (LEFT) --- */}
      <div className="flex-[2] space-y-10">

        {/* OBJECTIVE */}
        {data.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-400 pb-2 mb-4 text-slate-900 flex items-center gap-2">
              Objetivo Profissional
            </h2>
            <p className="text-justify text-sm leading-relaxed text-slate-800">
              {data.summary}
            </p>
          </section>
        )}

        {/* EDUCATION */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-400 pb-2 mb-5 text-slate-900">
            Formação Acadêmica
          </h2>
          <div className="space-y-5">
            {data.education.map(edu => (
              <div key={edu.id} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base text-slate-900">{edu.degree}</h3>
                  <span className="text-sm font-bold text-slate-700 whitespace-nowrap">{edu.year}</span>
                </div>
                <p className="text-sm italic text-slate-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-400 pb-2 mb-5 text-slate-900">
            Experiência Profissional
          </h2>
          <div className="space-y-8">
            {data.experiences.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-1 border-b border-dotted border-slate-300 pb-1">
                  <h3 className="font-bold text-base uppercase text-slate-900">{exp.company}</h3>
                  <span className="text-xs font-bold text-slate-500 italic bg-slate-100 px-2 py-0.5 rounded">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-800 mb-2">{exp.role}</p>
                <p className="text-justify text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* --- SIDEBAR (RIGHT) --- */}
      <div className="flex-1 border-l border-slate-200 pl-8 space-y-10">

        {/* PHOTO */}
        {data.photo && (
          <div className="flex justify-center">
            <div className="p-1 bg-white border border-slate-200 shadow-sm rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src={data.photo}
                className="w-[35mm] h-[45mm] object-cover grayscale-[10%]"
                alt="Foto de Perfil"
              />
            </div>
          </div>
        )}

        {/* PERSONAL DATA */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-400 pb-2 mb-4 text-slate-900">
            Dados Pessoais
          </h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li>
              <span className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Nacionalidade</span>
              {data.nationality}
            </li>
            <li>
              <span className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Estado Civil</span>
              {data.maritalStatus}
            </li>
            <li>
              <span className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Nascimento</span>
              {formatDate(data.birthDate)}
            </li>
            <li>
              <span className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Medidas</span>
              {data.height} | {data.weight}
            </li>
          </ul>
        </section>

        {/* DOCUMENTS */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-400 pb-2 mb-4 text-slate-900">
            Documentação
          </h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li>
              <span className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Código CANAC</span>
              {data.canac}
            </li>
            {data.cmaCode && (
              <li>
                <span className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Código CMA</span>
                {data.cmaCode}
              </li>
            )}
            <li>
              <span className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">CMA ({data.cma})</span>
              <span className="text-xs">Val: {formatDate(data.cmaValidity)}</span>
            </li>
            <li>
              <span className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">Passaporte</span>
              <span className="block">{data.passport}</span>
              <span className="text-xs text-slate-500">Val: {formatDate(data.passportValidity)}</span>
            </li>
          </ul>
        </section>

        {/* LANGUAGES */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-400 pb-2 mb-4 text-slate-900">
            Idiomas
          </h2>
          <ul className="space-y-2">
            {data.languages.map(lang => (
              <li key={lang} className="text-sm font-medium text-slate-800 bg-slate-50 border-l-2 border-slate-800 px-3 py-1.5">
                {lang}
              </li>
            ))}
          </ul>
        </section>

        {/* EXTRA COURSES */}
        {data.extraCourses.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-400 pb-2 mb-4 text-slate-900">
              Cursos Extras
            </h2>
            <ul className="space-y-4">
              {data.extraCourses.map(c => (
                <li key={c.id} className="text-sm">
                  <strong className="block leading-tight text-slate-900 mb-0.5">{c.name}</strong>
                  <span className="text-xs text-slate-600 block">
                    {c.institution} <span className="text-slate-400 mx-1">|</span> {c.year}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

      </div>
    </div>
  </div>
);

// 2. MODERN
const TemplateModern = ({ data }: { data: CVData }) => (
  <div className="w-full h-auto min-h-screen bg-white text-slate-800 flex flex-row font-sans">
    {/* Left Sidebar */}
    <div className="w-[32%] bg-slate-900 text-white p-6 pt-10">
      {data.photo && (
        <div className="mb-8 flex justify-center">
          <div className="w-[35mm] h-[45mm] object-cover shadow-xl border-[4px] border-white/20">
            <img src={data.photo} alt="Foto" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      <div className="text-sm space-y-6">
        <div><h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-700 pb-1">Contato</h3><ul className="space-y-2 text-slate-300 text-xs">{data.phone && <li className="flex gap-2"><Phone className="w-3 h-3 flex-shrink-0" /> {data.phone}</li>}{data.email && <li className="flex gap-2"><Mail className="w-3 h-3 flex-shrink-0" /> {data.email}</li>}{data.city && <li className="flex gap-2"><MapPin className="w-3 h-3 flex-shrink-0" /> {data.city}</li>}</ul></div>
        <div><h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-700 pb-1">Pessoal</h3><ul className="space-y-1 text-slate-300 text-xs"><li>{data.nationality}</li><li>{formatDate(data.birthDate)}</li><li>{data.maritalStatus}</li><li>{data.height} | {data.weight}</li></ul></div>
        <div><h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-700 pb-1">Docs</h3><ul className="space-y-1 text-slate-300 text-xs"><li>CANAC: {data.canac}</li>{data.cmaCode && <li>Cód CMA: {data.cmaCode}</li>}<li>CMA: {data.cma}</li><li>Pass: {data.passport}</li></ul></div>
        <div><h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-700 pb-1">Idiomas</h3><ul className="space-y-1 text-slate-300 text-xs">{data.languages.map(l => <li key={l}>{l}</li>)}</ul></div>
        {data.extraCourses.length > 0 && (<div><h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-700 pb-1">Cursos Extras</h3><div className="space-y-0 relative border-l border-slate-700 ml-1">{data.extraCourses.map((c) => (<div key={c.id} className="relative pl-4 pb-4 last:pb-0"><div className="absolute -left-[3px] top-1.5 w-[5px] h-[5px] rounded-full bg-slate-500"></div><h3 className="font-bold text-slate-200 text-xs">{c.name}</h3><div className="text-[10px] text-slate-400 mt-0.5">{c.institution} <span className="text-slate-600">|</span> {c.year}</div></div>))}</div></div>)}
      </div>
    </div>
    {/* Right Content */}
    <div className="w-[68%] p-8 pt-10">
      <div className="mb-8 border-b-2 border-slate-900 pb-4">
        <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight leading-none mb-2">{data.fullName}</h1>
        <p className="text-xl text-indigo-700 font-bold uppercase tracking-wide">{data.role}</p>
      </div>
      {data.summary && (<div className="mb-8"><h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-4 uppercase tracking-wide">Objetivo Profissional</h2><p className="text-sm text-slate-700 text-justify leading-relaxed">{data.summary}</p></div>)}
      <div className="mb-8"><h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-4 uppercase tracking-wide">Formação</h2><div className="space-y-0 relative border-l border-slate-200 ml-1">{data.education.map((edu) => (<div key={edu.id} className="relative pl-6 pb-6 last:pb-0"><div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-slate-800 border-2 border-white"></div><h3 className="font-bold text-slate-800 text-sm">{edu.degree}</h3><div className="text-xs text-slate-500 mt-1">{edu.institution} <span className="text-slate-300">|</span> {edu.year}</div></div>))}</div></div>
      <div className="mb-8"><h2 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1 mb-4 uppercase tracking-wide">Experiência Profissional</h2><div className="space-y-0 relative border-l border-slate-200 ml-1">{data.experiences.map((exp) => (<div key={exp.id} className="relative pl-6 pb-6 last:pb-0"><div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-slate-400 border-2 border-white"></div><div className="flex justify-between items-baseline mb-1"><h3 className="font-bold text-slate-800 text-base">{exp.role}</h3><span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">{exp.startDate} - {exp.endDate}</span></div><div className="text-xs font-bold uppercase text-slate-400 mb-2">{exp.company}</div><p className="text-sm text-slate-600 whitespace-pre-line leading-snug">{exp.description}</p></div>))}</div></div>
    </div>
  </div>
);

// 3. MINIMAL (Teal/Cream Design - Maria Silvestre Style)
const TemplateMinimal = ({ data }: { data: CVData }) => (
  <div className="w-full h-auto min-h-screen bg-white font-sans flex flex-col relative text-slate-800">
    <div className="h-[200px] bg-[#66D2B4] w-full absolute top-0 left-0 z-0 print:bg-[#66D2B4]"></div>
    <div className="relative z-10 flex flex-col h-full flex-1">
      <div className="flex items-end pt-12 px-8 pb-0 mb-0 h-[200px] relative">
        <div className="absolute top-[100px] left-[40px] w-40 h-40 rounded-full bg-white p-1.5 shadow-xl z-20 print:shadow-none">
          <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden">
            {data.photo ? <img src={data.photo} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300"><UserIcon className="w-16 h-16" /></div>}
          </div>
        </div>
        <div className="ml-[220px] mb-8 text-[#1A202C] w-full"><h1 className="text-5xl font-sans font-bold tracking-tighter leading-none mb-1 text-slate-900 mix-blend-multiply break-words">{data.fullName}</h1><p className="text-lg tracking-[0.2em] uppercase font-medium text-slate-800">{data.role}</p></div>
      </div>
      <div className="flex flex-1 min-h-[calc(100vh-200px)]">
        <div className="w-[35%] bg-[#F2F0E9] pt-28 px-6 pb-10 flex flex-col gap-6 print:bg-[#F2F0E9]">
          <div className="relative"><h3 className="bg-[#66D2B4] text-white font-bold text-center py-1 mb-3 uppercase text-xs tracking-wider shadow-sm print:bg-[#66D2B4] print:text-white">Contato</h3><ul className="space-y-2 text-xs text-slate-700 font-medium"><li className="flex items-center gap-3"><div className="w-1 h-3 bg-slate-800"></div><span>Brasileiro(a), {data.maritalStatus}</span></li>{data.phone && <li className="flex items-center gap-3"><Phone className="w-3 h-3 text-[#66D2B4]" /> {data.phone}</li>}{data.email && <li className="flex items-center gap-3"><Mail className="w-3 h-3 text-[#66D2B4]" /> <span className="break-all">{data.email}</span></li>}{data.city && <li className="flex items-start gap-3"><MapPin className="w-3 h-3 text-[#66D2B4] shrink-0" /> <span>{data.address}<br />{data.city}</span></li>}</ul></div>

          {/* IDIOMAS */}
          <div>
            <h3 className="bg-[#66D2B4] text-white font-bold text-center py-1 mb-3 uppercase text-xs tracking-wider shadow-sm print:bg-[#66D2B4]">Idiomas</h3>
            <ul className="space-y-1.5 text-xs text-slate-700 mb-4">
              {data.languages.map(l => (<li key={l} className="flex items-center gap-2"><div className="w-1 h-1 bg-[#66D2B4] rounded-full"></div>{l}</li>))}
            </ul>
          </div>

          {/* DOCUMENTAÇÃO */}
          <div>
            <h3 className="bg-[#66D2B4] text-white font-bold text-center py-1 mb-3 uppercase text-xs tracking-wider shadow-sm print:bg-[#66D2B4]">Documentação</h3>
            <ul className="space-y-1 text-[10px] text-slate-600">
              <li><strong>CANAC:</strong> {data.canac}</li>
              {data.cmaCode && <li><strong>Cód CMA:</strong> {data.cmaCode}</li>}
              <li><strong>CMA:</strong> {data.cma}</li>
              <li><strong>Passaporte:</strong> {data.passport}</li>
            </ul>
          </div>

          <div className="pt-2"><h3 className="bg-[#66D2B4] text-white font-bold text-center py-1 mb-3 uppercase text-xs tracking-wider shadow-sm print:bg-[#66D2B4]">Formação</h3><div className="space-y-3">{data.education.map((edu) => (<div key={edu.id} className="border-b border-slate-200 pb-2 last:border-0 last:pb-0"><p className="font-bold text-slate-800 text-xs uppercase leading-tight">{edu.degree}</p><p className="text-[10px] text-slate-500 mt-0.5">{edu.institution} | {edu.year}</p></div>))}</div></div>
          {data.extraCourses.length > 0 && (<div className="pt-2"><h3 className="bg-[#66D2B4] text-white font-bold text-center py-1 mb-3 uppercase text-xs tracking-wider shadow-sm print:bg-[#66D2B4]">Cursos Extras</h3><div className="space-y-2">{data.extraCourses.map((c) => (<div key={c.id}><p className="font-bold text-slate-800 text-[11px] leading-tight">{c.name}</p><p className="text-[10px] text-slate-500">{c.institution} | {c.year}</p></div>))}</div></div>)}
        </div>
        <div className="w-[65%] bg-white p-8 pt-10 flex flex-col gap-8">
          {data.summary && (<div><h3 className="bg-[#66D2B4] text-white font-bold px-4 py-1 mb-4 uppercase text-xs tracking-wider inline-block shadow-sm print:bg-[#66D2B4]">Objetivo Profissional</h3><p className="text-xs text-slate-700 text-justify leading-relaxed ml-2 border-l-2 border-[#66D2B4]/30 pl-4">{data.summary}</p></div>)}
          <div><h3 className="bg-[#66D2B4] text-white font-bold px-4 py-1 mb-4 uppercase text-xs tracking-wider inline-block shadow-sm print:bg-[#66D2B4]">Experiência Profissional</h3><div className="space-y-6 border-l-2 border-[#66D2B4]/30 ml-2 pl-4">{data.experiences.map((exp) => (<div key={exp.id} className="relative"><div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-[#66D2B4] border-2 border-white"></div><div className="flex flex-col mb-1"><h4 className="text-base font-bold text-slate-800 uppercase leading-tight">{exp.company}</h4><span className="text-xs font-bold text-[#66D2B4] mb-1">{exp.startDate} - {exp.endDate}</span><p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{exp.role}</p></div><p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line text-justify mt-1">{exp.description}</p></div>))}</div></div>
        </div>
      </div>
    </div>
  </div>
);

export default CVBuilder;
