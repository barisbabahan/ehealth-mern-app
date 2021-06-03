import React from "react";
import ServiceCard from "./ServiceCard/ServiceCard";
import "./ServicesSection.css";

const servicesJson = [
  {
    title: "Online Service",
    content:
      "Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis dolormagna, sed vestibulum felis ultrices accumsan. Mauris quis dui dictum",
  },
  {
    title: "Online Service",
    content:
      "Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis dolormagna, sed vestibulum felis ultrices accumsan. Mauris quis dui dictum",
  },
  {
    title: "Online Service",
    content:
      "Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis dolormagna, sed vestibulum felis ultrices accumsan. Mauris quis dui dictum",
  },
  {
    title: "Online Service",
    content:
      "Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis dolormagna, sed vestibulum felis ultrices accumsan. Mauris quis dui dictum",
  },
  {
    title: "Online Service",
    content:
      "Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis dolormagna, sed vestibulum felis ultrices accumsan. Mauris quis dui dictum",
  },
  {
    title: "Online Service",
    content:
      "Maecenas rhoncus ullamcorper ipsum at eleifend. Suspendisse mattis dolormagna, sed vestibulum felis ultrices accumsan. Mauris quis dui dictum",
  },
];

const ServicesSection = () => {
  return (
    <div className="services-root-container">
      <h1 className="section-title">Our Services</h1>
      <p className="section-content service-content">
        Mauris eget magna ligula. Fusce nec dictum arcu, et feugiat magna. Etiam
        augue elit, aliquam sit amet pharetra ac, pretium quis arcu. Sed dolor
        augue, luctus quis quam vel, lobortis auctor nisi. Nam nec sodales est,
        a eleifend justo
      </p>
      <div className="service-cards-container">
        {servicesJson.map((service, i) => (
          <ServiceCard
            title={service.title}
            key={i}
            content={service.content}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
