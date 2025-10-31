import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type ResumeDownloadProps = {
  triggerClassName?: string;
  standardUrl?: string;
  atsUrl?: string;
};

// Default links converted to direct download format
// If you change to another Drive share URL, the utility below will still convert it.
const DEFAULT_STANDARD = 'https://drive.google.com/file/d/1KfdNz8lkzZl3QgDck9PZi1vQnDX_z7oM/view?usp=sharing';
const DEFAULT_ATS = 'https://drive.google.com/file/d/1KGG_f-Q2h_dtS0uf48LJXM0v8Qe_6LSw/view?usp=sharing';

export const ResumeDownload: React.FC<ResumeDownloadProps> = ({
  triggerClassName = '',
  standardUrl = DEFAULT_STANDARD,
  atsUrl = DEFAULT_ATS,
}) => {
  const toDirectDownload = (url: string) => {
    // Matches /d/{FILE_ID}/ or id=FILE_ID patterns
    const idMatch = url.match(/\/d\/([A-Za-z0-9_-]+)/) || url.match(/[?&]id=([A-Za-z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
    }
    return url; // fallback
  };

  // Prefer a synchronous mapping for filenames. Fetching the Drive page often
  // runs into CORS restrictions in the browser, so rely on known IDs and
  // sensible fallbacks instead.
  const getFileNameFromDriveId = (fileId: string): string => {
    const mapping: Record<string, string> = {
      '1KfdNz8lkzZl3QgDck9PZi1vQnDX_z7oM': 'Ritesh_Resume_Standard.pdf',
      '1aGXF4BoJQ-5v-PChD9NCSS0uD5Cw6Apz': 'Ritesh_Resume_ATS.pdf',
    };

    return mapping[fileId] || 'Ritesh_Resume.pdf';
  };

  const { toast } = useToast();

  const openInNew = (url: string) => {
    const direct = toDirectDownload(url);
    const idMatch = direct.match(/id=([^&]+)/) || direct.match(/\/d\/([A-Za-z0-9_-]+)/);
    const fileId = idMatch && idMatch[1] ? idMatch[1] : '';

    const filename = getFileNameFromDriveId(fileId);

    try {
      const a = document.createElement('a');
      a.href = direct;
      a.download = filename;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        if (a.parentNode) document.body.removeChild(a);
      }, 100);

      toast({
        title: 'Download started',
        description: `${filename} will be downloaded shortly.`,
        duration: 2000,
      });
    } catch (e) {
      console.warn('Download method failed, trying fallback:', e);
      window.location.href = direct;

      toast({
        title: 'Download attempted',
        description: 'If the download did not start, please open the link.',
        duration: 2000,
      });
    }
  };

  const subject = 'Custom Targeted Resume Request';
  const body = `Hi Ritesh,\n\nI'd like a custom targeted resume. Here are the details:\n- Role Title: \n- Company: \n- Job Description URL: \n- Key Skills to Highlight: \n- Deadline: \n\nAnything else you need, let me know.\n\nThanks!`;
  const mailtoHref = `mailto:ritesh.2004.n@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="default" className={triggerClassName}>
          <Download className="w-4 h-4" />
          Download Resume
        </Button>
      </DialogTrigger>
  <DialogContent className="z-[999] w-[94vw] sm:w-auto max-w-3xl p-5 sm:p-8 rounded-2xl border border-portfolio-blue/30 dark:border-darkAccent/40 bg-white/95 dark:bg-[#1d1d22]/95 backdrop-blur-xl shadow-[0_4px_40px_-4px_rgba(30,58,138,0.35)] dark:shadow-[0_4px_42px_-4px_rgba(99,102,241,0.55)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/50 dark:ring-white/10" />
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-portfolio-blue/15 via-portfolio-lightBlue/10 to-transparent dark:from-darkAccent/25 dark:via-darkAccent/10 dark:to-transparent" />
        <DialogHeader className="relative z-10 text-center space-y-2">
          <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-portfolio-blue via-portfolio-lightBlue to-portfolio-blue dark:from-darkAccent dark:via-darkAccent/70 dark:to-darkAccent text-transparent bg-clip-text">Get My Resume</DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-portfolio-gray dark:text-darkText/70 max-w-2xl mx-auto">
            Choose between the visually polished version or the ATS-optimized version for job portals & automated parsers.
          </DialogDescription>
        </DialogHeader>
        <div className="relative z-10 mt-6 grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
          {/* Standard Resume */}
          <div className="group relative rounded-xl border border-portfolio-blue/40 dark:border-darkAccent/40 bg-white/85 dark:bg-darkCard/70 backdrop-blur-xl p-5 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default">
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-portfolio-blue/15 via-portfolio-lightBlue/10 to-transparent dark:from-darkAccent/20 dark:via-darkAccent/10" />
            <div className="relative flex items-start gap-3 mb-3">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-portfolio-blue to-portfolio-lightBlue dark:from-darkAccent dark:to-darkAccent text-white shadow">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-portfolio-darkBlue dark:text-darkText leading-tight">Standard Resume</h3>
                <p className="text-xs text-portfolio-gray dark:text-darkText/60">Polished & branded layout</p>
              </div>
            </div>
            <p className="relative text-sm text-portfolio-gray dark:text-darkText/70 leading-relaxed flex-1">
              Ideal for referrals, networking emails, and portfolio presentation. Includes visual hierarchy & subtle design accents.
            </p>
            <div className="mt-4 flex items-center justify-between text-[11px] text-portfolio-gray/70 dark:text-darkText/50">
              <span>PDF • ~350KB</span>
              <span>Updated Sep 2025</span>
            </div>
            <Button aria-label="Download standard resume" onClick={() => openInNew(standardUrl)} variant="default" className="relative z-10 cursor-pointer hover:cursor-pointer mt-4 w-full inline-flex items-center gap-2 font-medium bg-portfolio-blue hover:bg-portfolio-blue/90 dark:bg-darkAccent dark:hover:bg-darkAccent/90">
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
          {/* ATS Resume */}
            <div className="group relative rounded-xl border border-portfolio-blue/40 dark:border-darkAccent/40 bg-white/85 dark:bg-darkCard/70 backdrop-blur-xl p-5 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default">
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-portfolio-lightBlue/15 via-portfolio-blue/10 to-transparent dark:from-darkAccent/20 dark:via-darkAccent/10" />
            <div className="relative flex items-start gap-3 mb-3">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-portfolio-lightBlue to-portfolio-blue dark:from-darkAccent/80 dark:to-darkAccent text-white shadow">
               <FileText className="w-5 h-5" /> 
              </div>
              <div>
                <h3 className="font-semibold text-portfolio-darkBlue dark:text-darkText leading-tight">ATS-Resume</h3>
                <p className="text-xs text-portfolio-gray dark:text-darkText/60">Parser optimized</p>
              </div>
            </div>
            <p className="relative text-sm text-portfolio-gray dark:text-darkText/70 leading-relaxed flex-1">
              Clean structure & semantic ordering crafted for Applicant Tracking Systems and online job submissions.
            </p>
            <div className="mt-4 flex items-center justify-between text-[11px] text-portfolio-gray/70 dark:text-darkText/50">
              <span>PDF • ~220KB</span>
              <span>Updated Sep 2025</span>
            </div>
            <Button aria-label="Download ATS resume" onClick={() => openInNew(atsUrl)} variant="secondary" className="relative z-10 cursor-pointer hover:cursor-pointer mt-4 w-full inline-flex items-center gap-2 font-medium bg-portfolio-lightBlue hover:bg-portfolio-lightBlue/90 text-white dark:text-darkText dark:bg-darkAccent dark:hover:bg-darkAccent/90">
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        </div>
        <div className="relative z-10 mt-6 text-[11px] sm:text-xs text-center text-portfolio-gray/70 dark:text-darkText/50 px-2">
          Need a custom-targeted version?{' '}
          <a
            href={mailtoHref}
            className="inline-flex items-center gap-1 underline decoration-dotted hover:text-portfolio-blue dark:hover:text-darkAccent cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-lightBlue dark:focus-visible:ring-darkAccent rounded-sm px-1 py-0.5 transition-colors"
          >
            Email me
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDownload;
