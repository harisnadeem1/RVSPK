
import React from 'react';
import { Shield, Award, MapPin, Headphones } from 'lucide-react';

function TrustBar() {
  const trustItems = [
    { icon: Shield, text: 'SECP Regulated' },
    { icon: Award, text: 'PMEX Licensed' },
    { icon: MapPin, text: 'Lahore Office' },
    { icon: Headphones, text: 'Client Support' }
  ];

  return (
    <div className="bg-primary text-primary-foreground py-2 border-b border-primary/20">
      <div className="container-custom">
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8 text-sm">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrustBar;
