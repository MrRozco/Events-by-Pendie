import { ButtonLink, Kicker } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-ep flex flex-col items-start gap-7">
        <Kicker>404</Kicker>
        <h1 className="heading-2">This page didn’t make the <em className="accent">guest list.</em></h1>
        <p className="lead max-w-[520px]">The page you’re looking for has moved or never existed.</p>
        <ButtonLink href="/" arrow>Back to home</ButtonLink>
      </div>
    </section>
  );
}
