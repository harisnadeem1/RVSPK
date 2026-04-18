
import React from 'react';
import { Briefcase } from 'lucide-react';

function ProfileCard({ name, title, experience, bio, expertise, imagePlaceholder }) {
  return (
    <div className="card-container professional-card">
      <div className="card-content-grow">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="h-32 w-32 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground mx-auto md:mx-0">
              <span className="text-4xl font-bold">{name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-1">{name}</h3>
            <p className="text-accent font-medium mb-2">{title}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>{experience} years experience</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">{bio}</p>
            {expertise && expertise.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
