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
      Description:
        "Led an indirect team of two other developer experience engineers to maintain and improve the AWS Amplify JS repository, directly contributing to lower issue counts, improved customer experience, and triaging issues.",
      Responsibilities: [
        "Spearheaded cross-functional initiatives to enhance developer experience, reducing open GitHub issues for the Amplify JS repository by 36%.",
        "Mentored and coached junior developer experienced engineers, resulting in one promotion to a senior position.",
        "Created and maintained comprehensive developer documentation, tutorials, and code samples, contributing to a 20% reduction in open documentation issues.",
        "Collaborated with product and engineering teams to improve the developer experience of Amplify APIs, resulting in a 30% increase in adoption and usage of the library.",
        "Provided expert guidance to customers to define frontend web and mobile application architectures by collaborating with them and leveraging AWS services including Amazon Cognito and Amazon S3.",
      ],
    },
    {
      Company: "Perficient",
      Date: "February 2022 - August 2022",
      Title: "Technical Consultant",
      Description:
        "Navigated multiple projects, from independently tackling backend challenges, to fulfilling frontend expectations with React/Next.js/Redux, while mentoring junior team members in large-scale project contributions.",
      Responsibilities: [
        "Stepped into a challenging role as the technical lead and sole developer on a project with minimal knowledge transfer, migrating a MySQL database deployed on Amazon Linux AMI with over 1 million records within a month.",
        "Oversaw significant contributions to a large codebase using Next.js, Redux, and React, introducing new features while adhering to strict quality checks and testing protocols.",
        "Volunteered for an internal project built with React/Redux, mentoring junior engineers on collaborative project contribution while developing mock data allowing frontend development to continue during backend rewrite.",
      ],
    },
    {
      Company: "IBM",
      Date: "December 2018 - February 2022",
      Title: "Application Developer",
      Description:
        "Mastered new tech to modernize decade-old code and steer large government projects, while coaching junior team members. Orchestrated a cloud migration over several months and solidified the process with comprehensive documentation.",
      Responsibilities: [
        "Collaborated with distributed teams of various sizes on the design, development, and testing of solutions involving legacy code over a decade old to large-scale government projects while creating comprehensive documentation to explain new features and rectify inconsistencies in existing documentation.",
        "Documented and managed over 3+ months the migration of transports from an on-premises SAP server to a cloud-based server, ensuring smooth transition and minimal disruption.",
        "Mentored junior team members, assisting with projects both inside and outside of individual direct involvement.",
      ],
    },
    {
      Company: "Self-Employed",
      Date: "March 2018 - December 2018",
      Title: "Frontend Engineer",
      Description:
        "Utilized self-taught knowledge of frontend development, leveraging Ruby on Rails and HTML, CSS, JavaScript, and the Bootstrap framework to create engaging web interfaces for local clients.",
      Responsibilities: [
        "Assembled and managed a team composed of a graphic designer and an editor to ensure high-quality outputs and client satisfaction",
        "Implemented Agile methodologies to release features incrementally, enabling regular client feedback and prompt adjustments to meet evolving needs",
        "Transformed a legacy website into a modern, user-friendly platform using contemporary web development frameworks, enhancing user experience and functionality",
        "Liaised directly with clients to understand their needs and expectations, ensuring delivered solutions were in line with their business objectives",
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Bannon Tanner</h1>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Download
        </a>
      </div>
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
          Software professional with a strong bias for action and sense of
          ownership. Valued for interpersonal skills combined with a positive
          approach, strong communication, and collaboration skills. Recognized
          for innovative and creative solutions to complex problems together
          with strong organizational and time management skills. Known for
          accepting and thriving in challenging and professional development
          opportunities.
        </p>
      </div>
      <div className={styles.skills}>
        <h2 className={styles.center}>Key Skills</h2>
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
