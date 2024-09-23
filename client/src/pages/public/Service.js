import React from "react";

const Service = () => {
  const services = [
    {
      name: "Web Development",
      description: "Build responsive and scalable websites.",
      url: "https://www.w3schools.com/",
    },
    {
      name: "Graphic Design",
      description: "Creative designs for all your branding needs.",
      url: "https://www.canva.com/",
    },
    {
      name: "Digital Marketing",
      description: "Boost your online presence and reach.",
      url: "https://www.hubspot.com/",
    },
    {
      name: "SEO Optimization",
      description: "Improve your website's visibility on search engines.",
      url: "https://moz.com/",
    },
    {
      name: "Content Creation",
      description: "Engaging content for your audience.",
      url: "https://www.adobe.com/express/",
    },
    {
      name: "Social Media Management",
      description: "Manage and grow your social media accounts.",
      url: "https://www.buffer.com/",
    },
  ];

  const handleLinkClick = (serviceName) => {
    console.log(`Navigating to ${serviceName}`);
    // Add any additional tracking logic here
  };

  return (
    <div className="w-main p-6">
      <h3 className="text-3xl font-bold mb-6">SERVICES</h3>
      <div className="flex gap-4 text-gray-600">
        <img
          src="https://cdn.shopify.com/s/files/1/1636/8779/files/9069783_orig.jpg?v=1491836163"
          alt="Service Thumbnail"
          className="w-1/3 rounded-lg shadow-md"
        />
        <p className="flex-1">
          Cras magna tellus, congue vitae congue vel, facilisis id risus. Proin
          semper in lectus id faucibus. Aenean vitae quam eget mi aliquam
          viverra quis quis velit. Curabitur mauris diam, posuere vitae nunc
          eget, blandit pellentesque mi. Pellentesque placerat nulla at
          ultricies malesuada. Aenean mi lacus, malesuada at leo vel, blandit
          iaculis nisl. Praesent vestibulum nisl sed diam euismod, a auctor
          neque porta. Vestibulum varius ligula non orci tincidunt rutrum.
          Suspendisse placerat enim eu est egestas, aliquam venenatis elit
          accumsan. Donec metus quam, posuere sit amet odio et, ultricies
          consequat nibh.
        </p>
      </div>
      <div className="w-full mt-10">
        <h2 className="text-center text-2xl font-semibold">We Offer Best Services</h2>
        <div className="flex flex-wrap justify-center gap-10 mt-5">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[30%] flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleLinkClick(service.name)} // Tracking the click
            >
              <span className="text-xl font-semibold">{service.name}</span>
              <span className="text-gray-500 mt-2">{service.description}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;