import Hero from '@/sections/Hero';
import FeaturedJournals from '@/sections/FeaturedJournals';
import FeaturedBooks from '@/sections/FeaturedBooks';
import ResearchHighlights from '@/sections/ResearchHighlights';
import Partners from '@/sections/Partners';
import AboutPreview from '@/sections/AboutPreview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedJournals />
      <FeaturedBooks />
      <ResearchHighlights />
      <Partners />
      <AboutPreview />
    </>
  );
}
