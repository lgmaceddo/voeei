import { GoogleGenAI } from "@google/genai";
import { Question, CVData, Experience, Education, ExtraCourse } from "../types";

// Safe access to process.env to avoid ReferenceError in browsers
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';
const ai = new GoogleGenAI({ apiKey });

export const getAIExplanation = async (question: Question): Promise<string> => {
  if (!apiKey) return "API Key not configured for AI explanations.";

  try {
    const prompt = `
      Você é um instrutor especialista em aviação civil brasileira (ANAC).
      Explique de forma didática e concisa por que a alternativa correta é a correta para a seguinte questão:
      
      Pergunta: "${question.text}"
      Alternativas:
      ${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}
      Alternativa Correta (Índice Base 0): ${question.correctIndex}
      
      Foque na regra, lei ou conceito técnico envolvido. Mantenha o tom profissional e encorajador.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful flight attendant instructor.",
        thinkingConfig: { thinkingBudget: 0 } // Low latency preferred for UI interaction
      }
    });

    return response.text || "Não foi possível gerar uma explicação no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com o tutor virtual.";
  }
};

export const extractDataFromCV = async (base64Pdf: string): Promise<Partial<CVData>> => {
  if (!apiKey) throw new Error("API Key not found");

  try {
    const prompt = `
      Analise o documento PDF em anexo (Currículo) e extraia as informações para preencher um formulário estruturado.
      Retorne APENAS um objeto JSON válido (sem markdown, sem \`\`\`json).
      
      Use exatamente estas chaves e formatos:
      {
        "fullName": "Nome Completo (Title Case)",
        "role": "Cargo ou Objetivo Profissional",
        "email": "email@exemplo.com",
        "phone": "apenas números ou formatado",
        "address": "Endereço completo se houver",
        "city": "Cidade - UF",
        "zip": "CEP",
        "nationality": "Brasileiro ou Outra",
        "maritalStatus": "Solteiro(a), Casado(a), etc",
        "birthDate": "DD/MM/AAAA",
        "summary": "Resumo profissional ou Objetivo",
        "canac": "Código ANAC/CANAC (apenas se encontrado)",
        "cma": "1ª Classe ou 2ª Classe (apenas se encontrado)",
        "cmaCode": "Código CMA (Ex: MC251)",
        "experiences": [
          { "company": "Nome Empresa", "role": "Cargo", "startDate": "Ano ou Data", "endDate": "Ano ou Data", "description": "Resumo das atividades" }
        ],
        "education": [
           { "institution": "Nome Instituição", "degree": "Nome do Curso/Grau", "year": "Ano de conclusão ou periodo" }
        ],
        "extraCourses": [
           { "name": "Nome do Curso", "institution": "Instituição", "year": "Ano" }
        ],
        "languages": ["Inglês - Intermediário", "Espanhol - Básico"],
        "skills": ["Habilidade 1", "Habilidade 2"]
      }

      Se não encontrar uma informação, deixe a string vazia "" ou array vazio [].
      Trate datas para o formato DD/MM/AAAA e Anos para YYYY.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: 'application/pdf', data: base64Pdf } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data returned");

    // Clean potential markdown formatting if the model ignored instructions
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Gemini PDF Extraction Error:", error);
    throw new Error("Falha ao processar o PDF. Verifique se o arquivo é legível.");
  }
};