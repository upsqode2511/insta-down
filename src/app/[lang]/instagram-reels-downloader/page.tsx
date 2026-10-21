import Downloader from "@/components/Downloader";
import { getDictionary } from "@/dictionaries";
import { getSEOMetadata, getSEOMetaDataValues } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return getSEOMetadata(resolvedParams.lang, "reel");
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = getDictionary(resolvedParams.lang);
  const { title: metaTitle, description: metaDescription } = getSEOMetaDataValues(resolvedParams.lang, "reel");

  return (
    <Downloader 
      lang={resolvedParams.lang}
      dict={dict}
      activeTab="reel"
      title={dict.pages.reelsTitle}
      subtitle={dict.pages.reelsSubtitle}
      metaTitle={metaTitle}
      metaDescription={metaDescription}
    />
  );
}
