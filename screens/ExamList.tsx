
import React from 'react';
import { EXAM_CATEGORIES } from '../constants';
import { ExamCategory } from '../types';
import { ExamListHeader } from './list/ExamListHeader';
import { ExamCategoryCard } from './list/ExamCategoryCard';

interface ExamListProps {
  onSelectCategory: (category: ExamCategory) => void;
  activeFilter: string;
}

const ExamList: React.FC<ExamListProps> = ({ onSelectCategory, activeFilter }) => {

  const filteredCategories = EXAM_CATEGORIES.filter(cat => {
    if (activeFilter === 'ALL' || !activeFilter) return true;
    if (activeFilter === 'ANAC') return ['RPA', 'CGA', 'PSS', 'ESS'].includes(cat.id);
    if (activeFilter === 'PORTUGUESE') return cat.id.startsWith('PORT');
    if (activeFilter === 'SHL') return cat.id.startsWith('SHL');
    return true;
  });

  const getTitle = () => {
    if (activeFilter === 'PORTUGUESE') return 'Simulados de Português';
    if (activeFilter === 'SHL') return 'Testes de Raciocínio (SHL)';
    if (activeFilter === 'ANAC') return 'Técnico ANAC';
    return 'Todos os Simulados';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-fade-in font-sans">
      <ExamListHeader
        activeFilter={activeFilter}
        title={getTitle()}
      />

      {filteredCategories.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">Nenhum simulado encontrado nesta categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <ExamCategoryCard
              key={category.id}
              category={category}
              onClick={() => onSelectCategory(category)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamList;