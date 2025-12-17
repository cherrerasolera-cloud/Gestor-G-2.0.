import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  Save,
  Fuel,
  Wind,
  Droplets,
  Sparkles,
  Award
} from 'lucide-react';

interface WasteLogProps {
  onRegister: (monthIndex: number, amount: number, fileName: string) => void;
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const WasteLog: React.FC<WasteLogProps> = ({ onRegister }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  // Data extraction state
  const [extractedData, setExtractedData] = useState<{amount: number, type: string} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const processFile = () => {
    if (!file) return;
    setIsScanning(true);
    
    // Simulate OCR / AI processing delay
    setTimeout(() => {
      setIsScanning(false);
      setExtractedData({
        amount: Math.floor(Math.random() * (200 - 50) + 50) + 0.5,
        type: 'Aceite de Cocina Usado (ACU)'
      });
      setStep(2);
    }, 2000);
  };

  const handleConfirm = () => {
    if (extractedData && file) {
      onRegister(selectedMonth, extractedData.amount, file.name);
      setStep(3);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Carga de Certificados de Disposición</h1>
        <p className="text-gray-500">Transformamos tus documentos en métricas de sostenibilidad y cumplimiento.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Form (8 Cols) */}
        <div className="lg:col-span-8 bg-surface border border-border rounded-xl p-8 shadow-sm">
          
          {/* Progress Stepper */}
          <div className="flex items-center justify-between mb-8 px-4">
            <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary/10' : 'border-gray-300'}`}>1</div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Carga</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary/10' : 'border-gray-300'}`}>2</div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Validación</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-primary bg-primary/10' : 'border-gray-300'}`}>3</div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Registro</span>
            </div>
          </div>

          {/* STEP 1: UPLOAD */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mes del Reporte Ambiental</label>
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-gray-900 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary font-medium"
                >
                  {MONTHS.map((m, idx) => (
                    <option key={idx} value={idx}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all hover:border-secondary/50 hover:bg-secondary/5 group relative bg-gray-50/50">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.png"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="bg-white p-4 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-sm border border-border">
                   <Upload className="text-secondary" size={32} />
                </div>
                <h3 className="text-gray-900 font-medium mb-1">
                  {file ? file.name : "Arrastra tu certificado aquí"}
                </h3>
                <p className="text-sm text-gray-500">Formatos: PDF, JPG, PNG (Max 5MB)</p>
              </div>

              <button 
                onClick={processFile}
                disabled={!file || isScanning}
                className={`w-full py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
                  ${!file || isScanning 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20'
                  }`}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Inteligencia Artificial Analizando...
                  </>
                ) : (
                  <>
                    Procesar con IA y Registrar
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 2: VALIDATION */}
          {step === 2 && extractedData && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
                <div className="text-sm">
                  <p className="text-blue-900 font-medium mb-1">Detección Exitosa</p>
                  <p className="text-blue-700">Verifica los datos extraídos del certificado para asegurar la trazabilidad LCA.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-border">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Tipo de Residuo</div>
                  <div className="text-gray-900 font-bold">{extractedData.type}</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-secondary/50 relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 p-1 bg-secondary text-white text-[10px] font-bold px-2 rounded-bl uppercase">Auditado</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Cantidad Extraída (Kg)</div>
                  <input 
                    type="number" 
                    step="0.1"
                    value={extractedData.amount}
                    onChange={(e) => setExtractedData({...extractedData, amount: parseFloat(e.target.value)})}
                    className="bg-transparent text-2xl font-bold text-secondary focus:outline-none w-full font-mono"
                  />
                </div>
              </div>

              {/* Aprovechamiento Info Section */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                <h4 className="text-emerald-800 font-bold flex items-center gap-2 mb-4">
                   <Sparkles size={18} />
                   Destino de Aprovechamiento
                </h4>
                <p className="text-emerald-700 text-xs mb-4">Al registrar este certificado, garantizas que tus {extractedData.amount} kg de residuos se transformen en:</p>
                
                <div className="grid grid-cols-2 gap-3">
                   <RepurposeItem icon={Fuel} label="Biodiesel (B100)" desc="Energía para transporte" />
                   <RepurposeItem icon={Wind} label="SAF (Fuel Aviación)" desc="Vuelos sostenibles" />
                   <RepurposeItem icon={Droplets} label="Jabones Industriales" desc="Limpieza ecológica" />
                   <RepurposeItem icon={Sparkles} label="Ceras Técnicas" desc="Uso cosmético/ind." />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-white border border-border text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirm}
                  className="flex-1 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Save size={18} />
                  Confirmar Registro
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <Fuel size={18} className="text-emerald-600" />
                 Economía Circular
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                 Sabías que 1 litro de aceite usado puede contaminar hasta 1,000 litros de agua pura? 
                 Al entregarlo a un gestor certificado, no solo cumples con la EPA, sino que permites la creación de biocombustibles que emiten un 80% menos de CO2.
              </p>
              <div className="space-y-2">
                 <div className="flex justify-between text-xs py-1 border-b border-gray-50">
                    <span className="text-gray-500">Emisiones Evitadas x Kg</span>
                    <span className="text-emerald-600 font-bold">2.85 kg CO2</span>
                 </div>
                 <div className="flex justify-between text-xs py-1 border-b border-gray-50">
                    <span className="text-gray-500">Agua Protegida</span>
                    <span className="text-blue-500 font-bold">~1,000 L</span>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bold mb-2">Certificación Verde</h4>
              <p className="text-[10px] text-gray-400 mb-4">El registro exitoso de tus certificados genera automáticamente tu puntaje de cumplimiento para el Informe de Consultoría.</p>
              <div className="flex items-center gap-2 bg-white/10 p-2 rounded border border-white/5">
                 <Award size={16} className="text-yellow-400" />
                 <span className="text-xs font-medium">Aliado del Planeta</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const RepurposeItem: React.FC<{ icon: React.ElementType, label: string, desc: string }> = ({ icon: Icon, label, desc }) => (
  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 flex items-start gap-3">
     <div className="p-1.5 bg-emerald-50 rounded text-emerald-600 shrink-0">
        <Icon size={14} />
     </div>
     <div>
        <div className="text-[10px] font-bold text-gray-900 leading-tight">{label}</div>
        <div className="text-[9px] text-gray-500 leading-tight">{desc}</div>
     </div>
  </div>
);