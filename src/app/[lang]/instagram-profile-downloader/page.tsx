import Downloader from "@/components/Downloader";
import { getDictionary } from "@/dictionaries";
import { getSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return getSEOMetadata(resolvedParams.lang, "profile");
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = getDictionary(resolvedParams.lang);

  return (
    <Downloader 
      lang={resolvedParams.lang}
      dict={dict}
      activeTab="profile"
      title={dict.pages.profileTitle}
      subtitle={dict.pages.profileSubtitle}
    />
  );
}
