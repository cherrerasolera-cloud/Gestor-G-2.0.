import React from 'react';
import { 
  Printer, 
  ShieldCheck, 
  Leaf, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Activity,
  Award
} from 'lucide-react';
import { MOCK_PROFILE, COMPLIANCE_CHECKLIST } from '../constants';

export const ConsultingReport: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Informe de Consultoría & Sostenibilidad</h1>
          <p className="text-gray-500">Diagnóstico técnico integral del establecimiento</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-black transition-colors shadow-lg"
        >
          <Printer size={18} />
          Imprimir Informe PDF
        </button>
      </div>

      {/* Report Document Style */}
      <div className="bg-white border border-border rounded-xl shadow-xl overflow-hidden print:shadow-none print:border-none">
        
        {/* Header Section */}
        <div className="p-8 border-b border-border bg-gray-50/50">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-emerald-600 font-bold text-2xl mb-2 flex items-center gap-2">
                 GESTOR G | <span className="text-gray-400 font-light">DIAGNÓSTICO</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{MOCK_PROFILE.razonSocial}</h2>
              <p className="text-sm text-gray-500">NIT: {MOCK_PROFILE.nit}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 font-medium">FECHA DE EMISIÓN</div>
              <div className="text-gray-900 font-bold">{today}</div>
              <div className="mt-2 inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 uppercase">
                 Estatus: Operativo Cumple
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-10">
          
          {/* Executive Summary */}
          <section>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={16} /> 1. Resumen Ejecutivo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
               <div className="prose prose-sm text-gray-600">
                 <p>Tras el análisis de los registros de 2023, el establecimiento presenta una <strong>eficiencia de gestión del 98.5%</strong>. Se han gestionado correctamente aproximadamente 800 kg de residuos grasos, evitando el vertimiento directo al alcantarillado público.</p>
                 <p>El perfil de riesgo es <strong>Bajo</strong>, con cumplimiento total de la inscripción ante la autoridad ambiental (Res. 0456 de 2023).</p>
               </div>
               <div className="flex flex-col justify-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">Nivel de Madurez</div>
                      <div className="text-sm text-emerald-600 font-medium">Excelente (Fase 3: Optimización)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Leaf size={24} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">Contribución LCA</div>
                      <div className="text-sm text-blue-600 font-medium">Impacto Neto Positivo (2.28 t CO2e)</div>
                    </div>
                  </div>
               </div>
            </div>
          </section>

          {/* Compliance Matrix */}
          <section>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ShieldCheck size={16} /> 2. Matriz de Cumplimiento Normativo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {COMPLIANCE_CHECKLIST.map((item, idx) => (
                 <div key={idx} className={`p-4 rounded-lg border flex items-center gap-3 ${item.isComplete ? 'bg-white border-emerald-100' : 'bg-amber-50 border-amber-200'}`}>
                    {item.isComplete ? (
                      <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                    ) : (
                      <AlertCircle className="text-amber-500 shrink-0" size={18} />
                    )}
                    <span className={`text-xs font-medium ${item.isComplete ? 'text-gray-700' : 'text-amber-800'}`}>{item.label}</span>
                 </div>
               ))}
            </div>
          </section>

          {/* Technical Diagnosis */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">3. Estado de Infraestructura</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Sistema de Trampa</span>
                    <span className="text-sm font-bold text-gray-900">{MOCK_PROFILE.tipoTrampa}</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Capacidad Hidráulica</span>
                    <span className="text-sm font-bold text-gray-900">{MOCK_PROFILE.capacidadTrampaLts} Litros</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Última Succión Técnica</span>
                    <span className="text-sm font-bold text-gray-900">{MOCK_PROFILE.ultimoMantenimiento}</span>
                 </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">4. Recomendaciones de Consultoría</h3>
              <ul className="space-y-3">
                 <li className="flex gap-2 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1 shrink-0"></div>
                    <strong>Reducción de pH:</strong> Se observa tendencia ácida en vertimientos. Revisar uso de desengrasantes industriales.
                 </li>
                 <li className="flex gap-2 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1 shrink-0"></div>
                    <strong>Logística Compartida:</strong> Implementar recolección colaborativa para reducir costos operativos en un 15% adicional.
                 </li>
                 <li className="flex gap-2 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1 shrink-0"></div>
                    <strong>Capacitación:</strong> Pendiente curso anual de manejo de residuos para personal de cocina (requisito Auditoría HSEQ).
                 </li>
              </ul>
            </div>
          </section>

          {/* Sustainability Footprint */}
          <section className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 text-emerald-100">
                <Award size={120} />
             </div>
             <div className="relative z-10">
               <h3 className="text-emerald-800 font-bold text-lg mb-2">Huella Circular Certificada</h3>
               <p className="text-emerald-700 text-sm mb-6 max-w-md">Su restaurante ha contribuido a la economía circular transformando residuos en materias primas valiosas.</p>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <CircularStat label="Biodiesel" value="560 L" />
                  <CircularStat label="SAF Fuel" value="120 L" />
                  <CircularStat label="Jabones" value="45 Kg" />
                  <CircularStat label="Detergentes" value="12 L" />
               </div>
             </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-50 border-t border-border flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-mono">
           <span>Gestor G LCA Platform - v2.5</span>
           <span>Página 01 / 01</span>
           <span>Copia Controlada</span>
        </div>

      </div>
    </div>
  );
};

const CircularStat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-emerald-200">
     <div className="text-[10px] text-emerald-600 font-bold uppercase">{label}</div>
     <div className="text-lg font-bold text-emerald-900">{value}</div>
  </div>
);