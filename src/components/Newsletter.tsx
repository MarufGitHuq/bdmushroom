import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-16 md:py-28 bg-primary ml-0 md:ml-20 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-10">
        <div className="max-w-2xl">
          {/* Heading */}
          <span className="text-primary-foreground/80 font-semibold uppercase tracking-widest text-sm">
            Newsletter
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-primary-foreground mt-3 mb-6">
            Stay Fresh with Updates
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Subscribe for exclusive deals, farming tips, and new product launches.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 px-6 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:ring-primary-foreground/30"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="h-14 px-8 gap-2"
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <Check className="w-5 h-5" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-primary-foreground/60 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
