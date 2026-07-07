import AboutHero from "@/components/about/about-hero"
import AboutStory from "@/components/about/about-story"
import AboutValues from "@/components/about/about-values"
import AboutTeam from "@/components/about/about-team"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
    </div>
  )
}