import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { socialsLinks } from "@/data/links.data";
import { cn } from "@/lib/utils";
import { Link, createFileRoute } from "@tanstack/react-router";
import { nanoid } from "nanoid";

export const Route = createFileRoute("/terms-and-conditions/")({
  component: RouteComponent,
});

function RouteComponent() {
  const terms = [
    {
      title: "Acceptance of Terms",
      text: "By accessing or using the Chatbot, you ('User') affirm that you are at least 18 years old and agree to comply with these Terms and Conditions, as well as all applicable laws and regulations. If you are using the Chatbot on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.",
    },
    {
      title: "No Liability for Responses",
      text: "The Chatbot generates responses based on publicly available data and may occasionally produce inaccurate, incomplete, or misleading information. memtatio does not guarantee the accuracy, reliability, or completeness of any responses provided by the Chatbot. Users are solely responsible for verifying the correctness of any information before acting on it.",
    },
    {
      title: "No Professional Advice",
      text: "The Chatbot is not a substitute for professional, legal, medical, or financial advice. Users must consult qualified professionals for decisions requiring expert judgment. memtatio disclaims all liability for any actions taken based on Chatbot responses.",
    },
    {
      title: "User Responsibility",
      text: "Users must not input confidential, proprietary, or sensitive information into the Chatbot. memtatio is not liable for any misuse of data by Users or unauthorized third parties.",
    },
    {
      title: "No Warranty",
      text: "The Chatbot is provided 'as-is' without warranties of any kind, including merchantability, fitness for a particular purpose, or non-infringement. memtatio is not liable for any damages, including direct, indirect, incidental, or consequential damages, arising from Chatbot use.",
    },
    {
      title: "Prohibited Activities",
      text: `
			Do not use the Chatbot to generate defamatory, harmful, or illegal content.
			Reverse-engineer, decompile, or modify the Chatbot. Exploit the Chatbot for commercial purposes without written permission.`,
    },
    {
      title: "Termination",
      text: "Memtatio may terminate or suspend access to the Chatbot for violations of these Terms or legal requirements. Users may discontinue use at any time.",
    },
    {
      title: "Changes to Terms",
      text: "Memtatio reserves the right to update these Terms. Continued use of the Chatbot constitutes acceptance of revised terms.",
    },
  ];
  return (
    <section className="m-auto max-w-xl space-y-2 p-4 px-8 [&_p]:text-muted-foreground">
      <Badge className="m-auto mb-4 flex items-center gap-2">
        In Effect From June 16 2025
      </Badge>
      <h1 className="text-center text-3xl capitalize">Terms & Conditions</h1>
      <p className=" my-6 inline-flex items-start gap-1 text-xs  md:text-sm">
        By using the memtatio AI chatbot ("memtatio"), you agree to the
        following terms and conditions. If you do not agree, you must not use
        memtatio.
      </p>
      {terms.map((term) => {
        return (
          <section key={nanoid()} className="mb-12 space-y-2 ">
            <h3 className="text-lg">{term.title}</h3>
            <p className="text-pretty text-sm">{term.text}</p>
          </section>
        );
      })}
      <div className="mb-12 text-lg text-muted-foreground capitalize">
        for questions, contact{" "}
        <Link
          to={socialsLinks.mail}
          className={cn(buttonVariants({ variant: "link" }), "ps-1 text-lg")}
        >
          e-mail
        </Link>
        <div className="text-sm text-muted-foreground normal-case font-light text-pretty ">
          <div>
            Memtaio is an opensource project created by{" "}
            <Link
              to={socialsLinks.x}
              target="_blank"
              className="text-foreground underline "
            >
              atybdot
            </Link>{" "}
            & hosted on{" "}
            <Link
              to={socialsLinks.project}
              target="_blank"
              className="text-foreground underline"
            >
              github.com
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
