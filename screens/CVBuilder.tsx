
import React, { useState, useRef, useEffect } from 'react';
import { User, CVData, Experience, Education, ExtraCourse } from '../types';
import {
  ArrowLeft, Plus, Trash2, Printer,
  User as UserIcon, Briefcase, GraduationCap,
  MapPin, Mail, Phone, Plane, Eye, RotateCcw,
  Camera, Settings, Palette, Download, Layout
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CVBuilderProps {
  user: User;
  onBack: () => void;
}

// --- HELPER FUNCTIONS & MASKS ---
const toUpperCase = (val: string) => val ? val.toUpperCase() : '';
const toTitleCase = (val: string) => {
  if (!val) return '';
  return val.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
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
  return val.replace(/\D/g, '').substring(0, 4);
};

// --- ELITE UI COMPONENTS ---

const EliteInput = ({ label, value, onChange, placeholder, type = "text", mask, transform, icon: Icon, themeColor = "#06B6D4" }: any) => {
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

  return (
    <div className="w-full space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 block" style={{ color: themeColor }}>
        {label}
      </label>
      <div className="relative group/input">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors" style={{ color: value ? themeColor : undefined }}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        {type === 'textarea' ? (
          <textarea
            className={`w-full ${Icon ? 'pl-11' : 'px-6'} py-4 bg-[#0F172C]/40 border border-white/5 rounded-2xl text-white outline-none focus:ring-4 transition-all resize-none h-32 text-sm font-medium`}
            style={{
              borderColor: 'rgba(255,255,255,0.05)',
              boxShadow: `0 0 0 0px transparent`
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = `${themeColor}80`;
              e.currentTarget.style.boxShadow = `0 0 0 4px ${themeColor}1a`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.boxShadow = `none`;
              handleBlur();
            }}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            className={`w-full ${Icon ? 'pl-11' : 'px-6'} py-4 bg-[#0F172C]/40 border border-white/5 rounded-2xl text-white outline-none focus:ring-4 transition-all text-sm font-medium`}
            style={{
              borderColor: 'rgba(255,255,255,0.05)',
              boxShadow: `0 0 0 0px transparent`
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = `${themeColor}80`;
              e.currentTarget.style.boxShadow = `0 0 0 4px ${themeColor}1a`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.boxShadow = `none`;
              handleBlur();
            }}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
};

const EliteSelect = ({ label, value, onChange, options, icon: Icon, themeColor = "#06B6D4" }: any) => (
  <div className="w-full space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 block italic" style={{ color: themeColor }}>
      {label}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />}
      <select
        className={`w-full ${Icon ? 'pl-11' : 'px-6'} py-4 bg-[#0F172C]/40 border border-white/5 rounded-2xl text-white outline-none transition-all text-sm font-medium appearance-none cursor-pointer`}
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        onFocus={(e) => e.currentTarget.style.borderColor = `${themeColor}80`}
        onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled className="bg-[#1E293B]">Selecione</option>
        {options.map((opt: string) => <option key={opt} value={opt} className="bg-[#1E293B]">{opt}</option>)}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <RotateCcw className="w-3 h-3 rotate-90" />
      </div>
    </div>
  </div>
);

// --- MAIN CV BUILDER ---

const CVBuilder: React.FC<CVBuilderProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<'PERSONAL' | 'CAREER' | 'EDUCATION' | 'DESIGN'>('PERSONAL');
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic'>('modern');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const initialData: CVData = {
    photo: '',
    photoZoom: 1,
    photoY: 0,
    fullName: toUpperCase(user.name),
    role: 'Comissário de Voo / Flight Attendant',
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
    cma: '1ª Classe',
    cmaValidity: '',
    passport: '',
    passportValidity: '',
    summary: 'Profissional focado em segurança operacional e hospitalidade de alto padrão. Experiência em atendimento VIP e gestão de crises.',
    experiences: [
      {
        id: '1',
        company: 'COMPANHIA EXEMPLO',
        role: 'Atendimento ao Cliente',
        startDate: '2022-01',
        endDate: 'Presente',
        description: 'Gestão de experiência do passageiro e protocolos de segurança.'
      }
    ],
    education: [],
    extraCourses: [],
    skills: [],
    languages: ['Inglês (Avançado/ICAO 5)', 'Espanhol (Intermediário)'],
    colorTheme: '#06B6D4'
  };

  const [cvData, setCvData] = useState<CVData>(() => {
    const saved = localStorage.getItem('cv_builder_v2_data');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('cv_builder_v2_data', JSON.stringify(cvData));
  }, [cvData]);

  const handleInputChange = (field: keyof CVData, value: any) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData(prev => ({ ...prev, photo: reader.result as string, photoZoom: 1, photoY: 0 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAll = () => {
    if (window.confirm("Limpar todos os dados do currículo?")) {
      setCvData(initialData);
    }
  };

  const handleExportPDF = async () => {
    if (!cvRef.current) return;
    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`CV_${cvData.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error(e);
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // --- RENDERERS ---

  return (
    <div className="min-h-screen bg-[#0F172C] text-slate-100 font-sans p-6 md:p-10 flex flex-col gap-10">

      {/* Print Styles */}
      <style>{`
        @media print {
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .print-hidden { display: none !important; }
          #resume-preview-container { 
            position: absolute !important; 
            top: 0 !important; 
            left: 0 !important; 
            width: 210mm !important; 
            height: 297mm !important; 
            margin: 0 !important;
            padding: 0 !important;
            z-index: 9999 !important;
          }
          #resume-preview {
            box-shadow: none !important;
            border: none !important;
            width: 100% !important;
            height: 100% !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Header Bar */}
      <div className="flex items-center justify-between print-hidden">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-4 bg-[#1E293B] hover:bg-[#2D3B55] rounded-2xl border border-white/5 transition-all group">
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-[#06B6D4]" />
          </button>
          <div>
            <h1 className="text-4xl font-black tracking-tighter elite-heading uppercase flex items-center gap-3">
              CURRÍCULO <span style={{ color: cvData.colorTheme }}>ELITE</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">Edição de Identidade Visual de Cabine.</p>
          </div>
        </div>

        <div className="flex items-center bg-[#1E293B] p-2 rounded-[2rem] border border-white/5">
          <button
            onClick={() => setSelectedTemplate('modern')}
            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${selectedTemplate === 'modern' ? 'shadow-[0_10px_30px_rgba(6,182,212,0.3)]' : 'text-slate-400 hover:text-white'}`}
            style={selectedTemplate === 'modern' ? { backgroundColor: cvData.colorTheme, color: '#0F172C' } : {}}
          >
            TEMPLATE ELITE MODERN
          </button>
          <button
            onClick={() => setSelectedTemplate('classic')}
            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${selectedTemplate === 'classic' ? 'shadow-[0_10px_30px_rgba(6,182,212,0.3)]' : 'text-slate-400 hover:text-white'}`}
            style={selectedTemplate === 'classic' ? { backgroundColor: cvData.colorTheme, color: '#0F172C' } : {}}
          >
            TEMPLATE LEGACY CLASSIC
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 flex-1 print-hidden">

        {/* --- LEFT: EDITOR SIDE --- */}
        <div className="space-y-10">

          {/* PHOTO LAB & THEME */}
          <div className="bg-[#1E293B] rounded-[3rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#06B6D4]/5 blur-[60px] pointer-events-none" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: cvData.colorTheme }} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: cvData.colorTheme }}>PHOTO LAB 5X7</h3>
              </div>

              <div className="flex gap-2">
                {['#06B6D4', '#F43F5E', '#10B981', '#8B5CF6', '#F59E0B'].map(color => (
                  <button
                    key={color}
                    onClick={() => handleInputChange('colorTheme', color)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${cvData.colorTheme === color ? 'border-white scale-125' : 'border-transparent opacity-50'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-[180px] h-[252px] bg-[#0F172C] rounded-2xl overflow-hidden border-2 border-white/10 shadow-inner flex items-center justify-center relative">
                {cvData.photo ? (
                  <img src={cvData.photo} alt="Preview" className="w-full h-full object-cover transition-transform duration-300" style={{ transform: `scale(${cvData.photoZoom}) translateY(${cvData.photoY}px)` }} />
                ) : (
                  <UserIcon className="w-16 h-16 text-slate-700" />
                )}
                <div className="absolute inset-0 border-[20px] border-[#1E293B]/20 pointer-events-none" />
              </div>

              <div className="flex-1 w-full space-y-8">
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="w-full py-5 bg-white text-[#0F172C] rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] transition-all">
                    <Camera className="w-5 h-5" /> ANEXAR FOTO PROFISSIONAL
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <span>ZOOM / ESCALA</span>
                      <span>{Math.round(cvData.photoZoom! * 100)}%</span>
                    </div>
                    <input type="range" min="1" max="2" step="0.01" value={cvData.photoZoom} onChange={(e) => handleInputChange('photoZoom', parseFloat(e.target.value))} className="w-full h-1.5 bg-[#0F172C] rounded-lg appearance-none cursor-pointer accent-[#06B6D4]" style={{ accentColor: cvData.colorTheme }} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <span>EIXO VERTICAL</span>
                      <span>{cvData.photoY}PX</span>
                    </div>
                    <input type="range" min="-100" max="100" step="1" value={cvData.photoY} onChange={(e) => handleInputChange('photoY', parseInt(e.target.value))} className="w-full h-1.5 bg-[#0F172C] rounded-lg appearance-none cursor-pointer accent-[#06B6D4]" style={{ accentColor: cvData.colorTheme }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PROTOCOLS & BIOMETRY */}
          <div className="bg-[#1E293B] rounded-[3rem] p-10 border border-white/5 shadow-2xl space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: cvData.colorTheme }}>PROTOCOLOS ANAC & BIOMETRIA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EliteInput themeColor={cvData.colorTheme} label="Altura (m)" value={cvData.height} onChange={(v: string) => handleInputChange('height', v)} mask={formatHeight} placeholder="1,75 m" />
              <EliteInput themeColor={cvData.colorTheme} label="Peso (kg)" value={cvData.weight} onChange={(v: string) => handleInputChange('weight', v)} mask={formatWeight} placeholder="70 kg" />
              <EliteInput themeColor={cvData.colorTheme} label="CANAC" value={cvData.canac} onChange={(v: string) => handleInputChange('canac', v)} placeholder="Código ANAC" />
              <EliteInput themeColor={cvData.colorTheme} label="Validade CMA" value={cvData.cmaValidity} onChange={(v: string) => handleInputChange('cmaValidity', v)} mask={formatDateMask} placeholder="DD/MM/AAAA" />
              <div className="md:col-span-2">
                <EliteInput themeColor={cvData.colorTheme} type="textarea" label="Idiomas (Padrão ICAO)" value={cvData.languages.join('\n')} onChange={(v: string) => handleInputChange('languages', v.split('\n'))} placeholder="Ex: Inglês (Avançado/ICAO 5)" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleExportPDF} disabled={isGeneratingPDF} className="flex-1 py-8 text-[#0F172C] rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-all" style={{ background: `linear-gradient(to right, ${cvData.colorTheme}, ${cvData.colorTheme}dd)` }}>
              {isGeneratingPDF ? "PROCESSANDO TERMINAL..." : "EXPORTAR TERMINAL PDF"}
            </Button>
            <button onClick={clearAll} className="p-6 bg-[#1E293B] hover:bg-rose-500 hover:text-white text-slate-500 rounded-[2rem] border border-white/5 transition-all">
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* --- RIGHT: PREVIEW SIDE --- */}
        <div className="xl:sticky xl:top-10 h-fit" id="resume-preview-container">
          <div className="bg-[#0F172C] p-4 rounded-[4rem] border border-white/10 shadow-[0_60px_100px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="bg-white text-slate-900 shadow-2xl w-full aspect-[210/297] scale-[1.0] origin-top overflow-hidden" id="resume-preview">
              <div ref={cvRef}>
                {selectedTemplate === 'modern' ? <TemplateModern data={cvData} /> : <TemplateClassic data={cvData} />}
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">OPERATIONAL_PREVIEW_MODE_V2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TEMPLATES ---

const TemplateModern = ({ data }: { data: CVData }) => {
  const themeColor = data.colorTheme || '#06B6D4';
  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-800 flex flex-row overflow-hidden font-sans">
      {/* Left Sidebar */}
      <div className="w-[32%] bg-[#0F172C] text-white p-8 pt-12 flex flex-col gap-10">
        {data.photo && (
          <div className="flex justify-center">
            <div className="w-[35mm] h-[50mm] bg-[#1E293B] border-[3px] border-white/10 shadow-2xl overflow-hidden relative">
              <img
                src={data.photo}
                className="w-full h-full object-cover"
                style={{ transform: `scale(${data.photoZoom}) translateY(${data.photoY}px)` }}
                alt="Profile"
              />
            </div>
          </div>
        )}

        <div className="space-y-8">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 border-b border-white/10 pb-2" style={{ color: themeColor }}>Biometria</h3>
            <ul className="space-y-3 text-[11px] font-bold text-slate-300">
              <li className="flex flex-col"><span className="text-[9px] text-slate-500 uppercase mb-0.5">Altura / Peso</span> {data.height || '1,75 m'} / {data.weight || '70 kg'}</li>
              <li className="flex flex-col"><span className="text-[9px] text-slate-500 uppercase mb-0.5">CANAC</span> {data.canac || 'Não Informado'}</li>
              <li className="flex flex-col"><span className="text-[9px] text-slate-500 uppercase mb-0.5">Validade CMA</span> {data.cmaValidity || 'Não Informado'}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 border-b border-white/10 pb-2" style={{ color: themeColor }}>Idiomas ICAO</h3>
            <ul className="space-y-3 text-[11px] font-bold text-slate-300">
              {data.languages.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 pr-16 bg-white space-y-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-[#0F172C] mb-2 leading-none uppercase">{data.fullName}</h1>
          <p className="text-sm font-black tracking-[0.3em] text-slate-400 uppercase">{data.role}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 border-b border-slate-100 pb-2">Perfil Profissional</h2>
          <p className="text-sm font-medium text-slate-700 text-justify leading-relaxed">{data.summary}</p>
        </section>

        <section className="space-y-8">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 border-b border-slate-100 pb-2">Experiência de Voo / Carreira</h2>
          <div className="space-y-8">
            {data.experiences.map((exp, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-base font-black text-[#0F172C] leading-none">{exp.role}</h3>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">{exp.startDate} / {exp.endDate}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: themeColor }}>{exp.company}</p>
                <p className="text-xs font-medium text-slate-600 leading-relaxed italic">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 border-b border-slate-100 pb-2">Licenças e Certificações</h2>
          <ul className="space-y-2 text-sm font-bold text-slate-700">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} /> CCT ANAC (Aprovado)</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} /> CMA 1ª Classe Válido</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const TemplateClassic = ({ data }: { data: CVData }) => (
  <div className="w-full min-h-[297mm] bg-white text-slate-800 p-16 font-sans space-y-16">
    <div className="flex justify-between items-start border-b-2 border-slate-900 pb-10">
      <div>
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 uppercase mb-2">{data.fullName}</h1>
        <p className="text-sm font-black tracking-[0.3em] text-slate-400 uppercase italic mb-8">{data.role}</p>

        <div className="flex gap-8 text-[11px] font-bold text-slate-500 uppercase">
          <span className="flex items-center gap-2">CANAC: {data.canac || 'N/I'}</span>
          <span className="flex items-center gap-2">{data.phone}</span>
          <span className="flex items-center gap-2">{data.city}</span>
        </div>
      </div>
      {data.photo && (
        <div className="w-[45mm] h-[55mm] bg-slate-100 border border-slate-200 overflow-hidden">
          <img
            src={data.photo}
            className="w-full h-full object-cover"
            style={{ transform: `scale(${data.photoZoom}) translateY(${data.photoY}px)` }}
            alt="Profile"
          />
        </div>
      )}
    </div>

    <div className="grid grid-cols-4 gap-12">
      <div className="col-span-1 space-y-12">
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Resumo</h2>
        </section>
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Idiomas</h2>
        </section>
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Experiência</h2>
        </section>
      </div>
      <div className="col-span-3 space-y-12">
        <section className="pt-2">
          <p className="text-sm font-medium text-slate-700 leading-relaxed text-justify">{data.summary}</p>
        </section>

        <section className="pt-2 space-y-2">
          {data.languages.map((l, i) => (
            <p key={i} className="text-xs font-bold text-slate-700">{l}</p>
          ))}
        </section>

        <section className="pt-2 space-y-10">
          {data.experiences.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-sm font-black text-slate-900 uppercase">{exp.company} — {exp.role}</h3>
                <span className="text-[10px] font-bold text-slate-400">{exp.startDate} / {exp.endDate}</span>
              </div>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  </div>
);

export default CVBuilder;
