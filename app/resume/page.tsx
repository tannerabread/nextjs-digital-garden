import styles from "./resume.module.css";

interface Contact {
  Email: string;
  LinkedIn: string;
  GitHub: string;
  Twitter: string;
  Blog: string;
}

interface Experience {
  Company: string;
  Date: string;
  Title: string;
  Description: string;
  Responsibilities: string[];
}

export default function Resume() {
  const contact: Contact = {
    Email: "bannon.n.tanner@gmail.com",
    LinkedIn: "linkedin.com/in/bannon-tanner",
    GitHub: "github.com/tannerabread",
    Twitter: "twitter.com/tannerabread",
    Blog: "bannon.cloud/blog",
  };

  const expertise = [
    "Process Improvement",
    "Communication",
    "Team Development",
    "Collaboration",
    "Problem-Solving",
    "Task Prioritization",
    "Resource Creation and Management",
    "Project Management",
    "Strategy",
  ];

  const technical = [
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "SCSS",
    "React",
    "Next.js",
    "React Native",
    "AWS Amplify JS | UI | CLI | Hosting",
    "AWS Lambda",
    "Amazon Cognito",
    "Amazon DynamoDB",
    "Amazon S3",
    "GraphQL",
    "REST APIs",
    "Node.js",
    "NPM",
    "Git",
    "UNIX Environments",
    "TDD",
    "Agile",
  ];

  const experience: Experience[] = [
    {
      Company: "Amazon Web Services",
      Date: "August 2022 - April 2023",
      Title: "Developer Experience Engineer",
      Description: "",
      Responsibilities: [
        "Spearheaded cross-functional initiatives to enhance developer experience, reducing open GitHub issues for the Amplify JS repository by 36% through regular analysis of pain points, areas of improvement, and emerging trends.",
        "Mentored and coached junior developer experienced engineers, resulting in a highly skilled and motivated team by providing guidance, support, and technical demonstrations.",
        "Created and maintained comprehensive developer documentation, tutorials, and code samples, contributing to a 20% reduction in open documentation issues.",
        "Collaborated with product and engineering teams to improve the developer experience of Amplify APIs, resulting in a 30% increase in adoption and usage of the library by effectively communicating the needs of the community between teams.",
        "Provided expert guidance to customers to define frontend web and mobile application architectures by collaborating with them and leveraging AWS services including Amazon Cognito and Amazon S3.",
      ],
    },
    {
      Company: "Perficient",
      Date: "February 2022 - August 2022",
      Title: "Technical Consultant",
      Description: "",
      Responsibilities: [
        "Stepped into a challenging role as the technical lead and sole developer on a project with minimal knowledge transfer, successfully migrating a MySQL database deployed on Amazon Linux AMI with over 1 million records using Sails.js and a REST API.",
        "Oversaw significant contributions to a large codebase using Next.js, Redux, and React, introducing new features while adhering to strict quality checks and testing protocols.",
        "Volunteered for an internal project built with React/Redux, mentoring junior engineers on collaborative project contribution while developing mock data allowing frontend development to continue during backend rewrite.",
      ],
    },
    {
      Company: "IBM",
      Date: "December 2018 - February 2022",
      Title: "Application Developer",
      Description: "",
      Responsibilities: [
        "Contributed to large-scale government projects with distributed teams of varying sizes on the design, development, and testing of solutions involving legacy code over a decade old while creating comprehensive documentation to explain new features and rectify inconsistencies in existing documentation.",
        "Documented and managed the migration of transports from an on-premises SAP server to a cloud-based server, ensuring smooth transition and minimal disruption.",
        "Mentored junior team members, assisting with projects outside of my direct involvement, demonstrating advanced knowledge and leadership skills.",
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <h1>Bannon Tanner</h1>
      <div className={styles.contact}>
        <ul>
          {Object.keys(contact).map((key) => (
            <li key={key}>
              {key === "Email" ? (
                <span>
                  {key}:{" "}
                  <a href={`mailto:${contact[key as keyof Contact]}`}>
                    {contact[key as keyof Contact]}
                  </a>
                </span>
              ) : (
                <span>
                  {key}:{" "}
                  <a href={contact[key as keyof Contact]}>
                    {contact[key as keyof Contact]}
                  </a>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.summary}>
        <h2 className={styles.center}>Software Engineer</h2>
        <p>
          Skilled, hands-on, accomplished professional with experience providing
          software engineering and development services to meet organizational
          goals. Adept at resolving issues, implementing products and tools that
          improve processes, and coordinating with leadership to achieve
          outcomes. Ability to prioritize tasks, create resources, and lead
          initiatives that allow for project success.
        </p>
      </div>
      <div className={styles.skills}>
        <h2 className={styles.center}>Key Skills</h2>
        <ul className={styles.skillSection}>
          <li>
            <b>
              <em>Expertise:</em>
            </b>
          </li>
          {expertise.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <ul className={styles.skillSection}>
          <li className={styles.category}>
            <b>
              <em>Technical:</em>
            </b>
          </li>
          {technical.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className={styles.experience}>
        <h2 className={styles.center}>Professional Experience</h2>
        {experience.map((job) => (
          <div key={job.Company}>
            <div className={styles.jobCompany}>
              <h3>{job.Company}</h3>
              <span />
              <h3>{job.Date}</h3>
            </div>
            <h3 className={styles.jobTitle}>{job.Title}</h3>
            <p className={styles.jobDescription}>{job.Description}</p>
            <ul className={styles.jobResponsibilities}>
              {job.Responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={`${styles.education} ${styles.center}`}>
        <h2>Education</h2>
        <p>
          <b>Bachelor of Science (B.S.) in Chemical Engineering</b>
        </p>
        <p>University of Louisiana at Lafayette</p>
      </div>
      <div className={`${styles.certifications} ${styles.center}`}>
        <h2 className={styles.center}>Certifications</h2>
        <p>
          <b>Solutions Architect Associate - Amazon Web Services</b>
        </p>
        <p>
          <b>SAP Certified Development Associate - ABAP</b>
        </p>
      </div>
    </div>
  );
}
