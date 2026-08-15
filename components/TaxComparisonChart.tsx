import React from 'react';
import { translations } from '../translations.ts';

const getTaxData = (lang: string) => {
  const data = [
    { country: 'Argentina', rate: 35, isParaguay: false },
    { country: 'Brasil', rate: 34, isParaguay: false },
    { country: 'USA', rate: 26, isParaguay: false },
    { country: 'Europe (Avg)', rate: 25, isParaguay: false },
    { country: 'Taiwan', rate: 20, isParaguay: false },
    { country: 'UAE', rate: 9, isParaguay: false },
    { country: 'Paraguay (General)', rate: 10, isParaguay: true },
    { country: 'Paraguay (Maquila)', rate: 1, isParaguay: true },
  ];

  // Optional: Translations for country names
  if (lang === 'es') {
    data[3].country = 'Europa (Prom.)';
    data[2].country = 'EE.UU.';
    data[5].country = 'EAU';
  } else if (lang === 'pt') {
    data[3].country = 'Europa (Média)';
    data[2].country = 'EUA';
    data[5].country = 'EAU';
  } else if (lang === 'jp') {
    data[0].country = 'アルゼンチン';
    data[1].country = 'ブラジル';
    data[2].country = 'アメリカ';
    data[3].country = 'ヨーロッパ(平均)';
    data[4].country = '台湾';
    data[5].country = 'UAE';
    data[6].country = 'パラグアイ (一般)';
    data[7].country = 'パラグアイ (マキラ)';
  } else if (lang === 'zh') {
    data[0].country = '阿根廷';
    data[1].country = '巴西';
    data[2].country = '美国';
    data[3].country = '欧洲（平均）';
    data[4].country = '台湾';
    data[5].country = '阿联酋';
    data[6].country = '巴拉圭 (一般)';
    data[7].country = '巴拉圭 (Maquila)';
  } else if (lang === 'ar') {
    data[0].country = 'الأرجنتين';
    data[1].country = 'البرازيل';
    data[2].country = 'الولايات المتحدة';
    data[3].country = 'أوروبا (متوسط)';
    data[4].country = 'تايوان';
    data[5].country = 'الإمارات';
    data[6].country = 'باراغواي (عام)';
    data[7].country = 'باراغواي (ماكيلا)';
  } else if (lang === 'de') {
    data[3].country = 'Europa (Durchschn.)';
    data[5].country = 'VAE';
  }

  // sort by rate descending
  return data.sort((a, b) => b.rate - a.rate);
};

export const TaxComparisonChart: React.FC<{ lang: string }> = ({ lang }) => {
  const data = getTaxData(lang);
  const maxRate = Math.max(...data.map(d => d.rate));
  
  const getTitles = (code: string) => {
    const texts: any = {
      es: { title: "Ventaja", accent: "Fiscal Global", desc: "Comparativa de Impuestos Corporativos. Paraguay ofrece un entorno inigualable para la rentabilidad de su inversión." },
      en: { title: "Global Tax", accent: "Advantage", desc: "Corporate Tax Comparison. Paraguay offers an unmatched environment for investment profitability." },
      pt: { title: "Vantagem", accent: "Fiscal Global", desc: "Comparativo de Impostos Corporativos. O Paraguai oferece um ambiente inigualável para a rentabilidade do seu investimento." },
      jp: { title: "グローバル", accent: "税務上の利点", desc: "法人税の比較。パラグアイは投資の収益性において比類のない環境を提供します。" },
      de: { title: "Globaler", accent: "Steuervorteil", desc: "Vergleich der Körperschaftssteuer. Paraguay bietet ein unvergleichliches Umfeld für die Rentabilität von Investitionen." },
      zh: { title: "全球", accent: "税收优势", desc: "企业所得税比较。巴拉圭为投资盈利提供了无与伦比的环境。" },
      ar: { title: "ميزة", accent: "ضريبية عالمية", desc: "مقارنة ضرائب الشركات. توفر باراغواي بيئة لا مثيل لها لربحية الاستثمار." }
    };
    return texts[code] || texts['es'];
  };

  const t = getTitles(lang);

  return (
    <section id="tax-comparison" className="py-16 bg-stone-50 border-y border-stone-100 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="max-w-2xl mb-10 text-left">
          <h2 className="text-3xl md:text-4xl font-black mb-3 uppercase tracking-tighter text-ihara-dark">
            {t.title} <span className="text-ihara-red">{t.accent}</span>
          </h2>
          <p className="text-stone-500 font-medium italic text-base leading-relaxed max-w-xl">
            {t.desc}
          </p>
          <div className="h-1 w-24 bg-ihara-red mt-6"></div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone-100 relative">
          
          <div className="flex flex-col gap-4 w-full">
            {data.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="w-full md:w-48 shrink-0 flex items-center justify-between md:justify-end md:pr-4">
                  <span className={`text-xs font-black uppercase tracking-widest ${item.isParaguay ? 'text-ihara-red' : 'text-stone-500'}`}>
                    {item.country}
                  </span>
                  <span className="md:hidden font-black text-base">{item.rate}%</span>
                </div>
                
                <div className="flex-1 w-full flex items-center gap-3">
                  <div className="flex-1 h-6 md:h-8 bg-stone-100 rounded-r-lg overflow-hidden flex items-center relative z-0">
                    <div 
                      className={`h-full absolute left-0 top-0 bottom-0 z-10 transition-all duration-1000 flex items-center justify-end pr-3 ${item.isParaguay ? 'bg-ihara-red text-white' : 'bg-ihara-dark text-white'}`}
                      style={{ width: `${(item.rate / maxRate) * 100}%` }}
                    >
                    </div>
                  </div>
                  <span className="hidden md:block font-black text-xl w-14 text-right">
                    {item.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 bg-stone-50 p-5 md:p-6 rounded-2xl border border-stone-200">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-ihara-dark flex items-center justify-center shrink-0 text-white font-black text-sm">10%</div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-[#1c1917] mb-2 text-sm">{lang === 'es' ? 'Régimen General' : lang === 'en' ? 'General Regime' : 'Régimen General'}</h4>
                <p className="text-stone-500 text-sm leading-relaxed font-medium italic">
                  {lang === 'es' ? 'Paraguay tiene uno de los impuestos corporativos más bajos de la región (IRE 10%), sistema territorial.' :
                   lang === 'en' ? 'Paraguay has one of the lowest corporate taxes in the region (IRE 10%), territorial system.' :
                   'Paraguay tiene uno de los impuestos corporativos más bajos de la región (IRE 10%), sistema territorial.'}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-ihara-red flex items-center justify-center shrink-0 text-white font-black text-sm">1%</div>
              <div>
                <h4 className="font-black uppercase tracking-widest text-[#dc2626] mb-2 text-sm">{lang === 'es' ? 'Ley de Maquila' : lang === 'en' ? 'Maquila Law' : 'Ley de Maquila'}</h4>
                <p className="text-stone-500 text-sm leading-relaxed font-medium italic">
                  {lang === 'es' ? 'Tributo único del 1% sobre el valor agregado en territorio paraguayo. Exoneración total de impuestos y aranceles a la importación y exportación.' :
                   lang === 'en' ? 'Single tax of 1% on value added in Paraguayan territory. Total exemption from import and export taxes and tariffs.' :
                   'Tributo único del 1% sobre el valor agregado en territorio paraguayo. Exoneración total de impuestos y aranceles a la importación y exportación.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
