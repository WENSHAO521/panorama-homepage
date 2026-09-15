import type { ImageMetadata } from 'astro';

import AFS from '@/assets/journal-covers/AFS.png';
import CPRT from '@/assets/journal-covers/CPRT.png';
import CRoPT from '@/assets/journal-covers/CRoPT.png';
import CSGS from '@/assets/journal-covers/CSGS.png';
import CSSR from '@/assets/journal-covers/CSSR.png';
import FSSS from '@/assets/journal-covers/FSSS.png';
import GGSR from '@/assets/journal-covers/GGSR.png';
import GRAHS from '@/assets/journal-covers/GRAHS.png';
import HealthNexus from '@/assets/journal-covers/HealthNexus.png';
import HNCBT from '@/assets/journal-covers/HNCBT.png';
import HNDH from '@/assets/journal-covers/HNDH.png';
import IRELS from '@/assets/journal-covers/IRELS.png';
import JDES from '@/assets/journal-covers/JDES.png';
import JESA from '@/assets/journal-covers/JESA.png';
import JLPCS from '@/assets/journal-covers/JLPCS.png';
import JPOII from '@/assets/journal-covers/JPOII.png';
import JSCC from '@/assets/journal-covers/JSCC.png';
import PFR from '@/assets/journal-covers/PFR.png';
import REMR from '@/assets/journal-covers/REMR.png';
import RESONANCE from '@/assets/journal-covers/RESONANCE.png';
import RGGD from '@/assets/journal-covers/RGGD.png';
import SES from '@/assets/journal-covers/SES.png';
import Silence from '@/assets/journal-covers/Silence.png';
import TTS from '@/assets/journal-covers/TTS.png';

const journalCoverAssets: Record<string, ImageMetadata> = {
  '/journals/covers/AFS.png': AFS,
  '/journals/covers/CPRT.png': CPRT,
  '/journals/covers/CRoPT.png': CRoPT,
  '/journals/covers/CSGS.png': CSGS,
  '/journals/covers/CSSR.png': CSSR,
  '/journals/covers/FSSS.png': FSSS,
  '/journals/covers/GGSR.png': GGSR,
  '/journals/covers/GRAHS.png': GRAHS,
  '/journals/covers/HealthNexus.png': HealthNexus,
  '/journals/covers/HNCBT.png': HNCBT,
  '/journals/covers/HNDH.png': HNDH,
  '/journals/covers/IRELS.png': IRELS,
  '/journals/covers/JDES.png': JDES,
  '/journals/covers/JESA.png': JESA,
  '/journals/covers/JLPCS.png': JLPCS,
  '/journals/covers/JPOII.png': JPOII,
  '/journals/covers/JSCC.png': JSCC,
  '/journals/covers/PFR.png': PFR,
  '/journals/covers/REMR.png': REMR,
  '/journals/covers/RESONANCE.png': RESONANCE,
  '/journals/covers/RGGD.png': RGGD,
  '/journals/covers/SES.png': SES,
  '/journals/covers/Silence.png': Silence,
  '/journals/covers/TTS.png': TTS,
};

export function getJournalCoverAsset(path?: string): ImageMetadata | undefined {
  return path ? journalCoverAssets[path] : undefined;
}
