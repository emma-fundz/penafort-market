
import React from 'react';
import RatingStars from '../common/RatingStars';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="mb-10 sm:mb-16 md:mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-2 md:mb-3">
            Customer Testimonials
          </h2>
          <p className="text-sm sm:text-base text-penafort-text-secondary max-w-lg">
            Hear what our satisfied customers have to say about their shopping experience.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-3 sm:mb-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
              />
              <div>
                <h4 className="font-medium text-penafort-text-primary text-sm sm:text-base">{testimonial.name}</h4>
                <RatingStars rating={testimonial.rating} />
              </div>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-penafort-text-secondary italic">"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
