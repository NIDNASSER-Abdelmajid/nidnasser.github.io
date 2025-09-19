"use client";

import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function FreelancerWidget() {
  return (
    <Card className="p-6 max-w-md bg-card/50 backdrop-blur-sm border-primary/20">
      <div className="flex items-start gap-4">
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <Image
            src="https://cdn3.f-cdn.com/ppic/287911125/logo/69037463/URwW7/CROPPED_profile_logo_WXFUH_151cc9cb96b043aab3c775ef1af05f3f.png?image-optimizer=force&format=webply&width=336"
            alt="Abdelmajid NIDNASSER"
            width={80}
            height={80}
            className="rounded-full border-2 border-primary/30"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-bold text-lg text-foreground">
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline decoration-primary/50"
              >
                ABDELMAJID NIDNASSER
              </a>
            </h3>
            <p className="text-sm text-muted-foreground">
              Gen AI & Data Engineer | PhD Candidate
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-primary" />
              <span>767648267</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-primary" />
              <span>abdelmajidnidnasser1@gmail.com</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
              <span className="leading-tight">
                Rabat, Morocco
              </span>
            </div>
          </div>

          <Button 
            size="sm" 
            variant="outline" 
            className="w-full text-xs border-primary/30 hover:bg-primary/10"
            asChild
          >
            <a 
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              Hire me on Freelancer.com
            </a>
          </Button>
        </div>
      </div>

      {/* Tracking pixel (hidden) */}
    </Card>
  );
}
