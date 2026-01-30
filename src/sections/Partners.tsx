import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface PartnerLogo {
  name: string;
  url: string;
  darkMode?: boolean;
}

interface PartnerCategory {
  title: string;
  logos: PartnerLogo[];
}

export default function Partners() {
  const { t } = useTranslation();

  const partnerCategories: PartnerCategory[] = [
    {
      title: t('partners.standards'),
      logos: [
        { name: 'Crossref', url: 'https://assets.crossref.org/logo/crossref-logo-200.svg' },
        { name: 'DOI', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/DOI_Foundation.svg/330px-DOI_Foundation.svg.png' },
        { name: 'ISSN', url: 'https://portal.issn.org/sites/all/themes/customissn/img/img_0160x0050px_logo_issn.svg' },
        { name: 'ISNI', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/ISNI_logo_recreation.svg/800px-ISNI_logo_recreation.svg.png' },
      ]
    },
    {
      title: t('partners.indexing'),
      logos: [
        { name: 'Google Scholar', url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png' },
        { name: 'Scilit', url: 'https://www.scilit.com/_ipx/q_80&s_120x48/scilit.svg' },
        { name: 'Dimensions', url: 'https://www.dimensions.ai/wp-content/themes/dimensions-2023.1/dist/images/dimensions-2024-logo.png' },
        { name: 'Semantic Scholar', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Semantic_Scholar_logo.svg/330px-Semantic_Scholar_logo.svg.png' },
        { name: 'OUCI', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Open_Ukrainian_Citation_Index_logo.png/330px-Open_Ukrainian_Citation_Index_logo.png' },
        { name: 'ICI', url: 'https://journals.indexcopernicus.com/img/ici2.png' },
        { name: 'BASE', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/BASE_search_engine_logo.svg/330px-BASE_search_engine_logo.svg.png' },
        { name: 'OpenAlex', url: 'https://i0.wp.com/blog.openalex.org/wp-content/uploads/2025/09/image-3.png' },
        { name: 'CJWK', url: 'https://www.cjwk.cn/_nuxt/img/newIndexLogo5.621abfe.png' },
      ]
    },
    {
      title: t('partners.discovery'),
      logos: [
        { name: 'WorldCat', url: 'https://search.worldcat.org/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F29926%2F1603118905-worldcat-logo.png&w=1920&q=75' },
        { name: 'OpenAIRE', url: 'https://www.openaire.eu/templates/yootheme/cache/27/Logo_Horizontal-27555593.webp' },
        { name: 'PKP', url: 'https://pkp.sfu.ca/wp-content/uploads/2022/10/logo.svg' },
        { name: 'ResearchGate', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/ResearchGate_logo.svg/330px-ResearchGate_logo.svg.png' },
        { name: 'MATILDA', url: 'https://www.csi.minesparis.psl.eu/wp-content/uploads/2023/09/MATILDA_Didier-Torny.jpg' },
        { name: 'WoS Research Commons', url: 'https://raw.githubusercontent.com/WENSHAO521/PanoramaScholarlyGroup/refs/heads/main/Indexed/wos.png' },
      ]
    },
    {
      title: t('partners.archiving'),
      logos: [
        { name: 'CLOCKSS', url: 'https://clockss.org/wp-content/uploads/2023/04/clockss-logo.png' },
        { name: 'LOCKSS', url: 'https://www.lockss.org/sites/g/files/sbiybj27616/files/2024-03/lockss-program-800x235_0.png' },
        { name: 'DNB', url: 'https://www.dnb.de/SiteGlobals/Frontend/DNBWeb/Images/logo.svg?__blob=normal&v=3' },
        { name: 'Zenodo', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Zenodo-gradient-square.svg/220px-Zenodo-gradient-square.svg.png' },
        { name: 'Harvard Library', url: 'https://library.harvard.edu/themes/custom/harvard/assets/images/logo-final.svg' },
        { name: 'Columbia Library', url: 'https://toolkit.library.columbia.edu/v3/img/cu-blue-logo.svg' },
        { name: 'Abu Dhabi Library', url: 'https://library.dctabudhabi.ae/sites/default/files/homepage/Maktaba_Logo_white_1_0.png', darkMode: true },
        { name: 'UCLA Library', url: 'https://openucla-static.library.ucla.edu/images/logos/ucla-library-logo-wht_resized.svg', darkMode: true },
      ]
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
            {t('partners.title')}
          </h2>
        </motion.div>

        {/* Partner Categories */}
        <div className="space-y-12">
          {partnerCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              {/* Category Title */}
              <h3 className="text-center text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-4">
                {category.title}
              </h3>

              {/* Logos Grid */}
              <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
                {category.logos.map((logo, logoIndex) => (
                  <motion.div
                    key={logo.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + logoIndex * 0.05 }}
                    className="group"
                  >
                    <div className="h-10 lg:h-12 px-4 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className={`h-full w-auto object-contain max-w-[100px] lg:max-w-[120px] ${
                          logo.darkMode ? 'brightness-0' : ''
                        }`}
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-[10px] text-neutral-400 mt-12 text-justify leading-relaxed border-t border-gray-200 pt-6 max-w-4xl mx-auto"
        >
          <strong>Disclaimer:</strong> {t('partners.disclaimer')}
        </motion.p>
      </div>
    </section>
  );
}
