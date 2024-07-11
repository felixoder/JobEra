// src/questions.ts

export interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  
  const questions: Question[] = [
    {
      question: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets",
    },
    {
      question: "What is the primary purpose of HTML?",
      options: ["Styling web pages", "Defining the structure of web pages", "Programming logic", "Database management"],
      answer: "Defining the structure of web pages",
    },
    {
      question: "Which programming language is commonly used for building web pages?",
      options: ["Java", "Python", "HTML", "JavaScript"],
      answer: "JavaScript",
    },
    {
      question: "What is the difference between Java and JavaScript?",
      options: ["Java is a server-side language, while JavaScript is a client-side language", "Java is used for frontend development, while JavaScript is used for backend development", "Java is a compiled language, while JavaScript is an interpreted language", "There is no difference"],
      answer: "Java is a compiled language, while JavaScript is an interpreted language",
    },
    {
      question: "What does SQL stand for?",
      options: ["Structured Query Language", "Standard Query Language", "Simple Query Language", "Stylish Query Language"],
      answer: "Structured Query Language",
    },
    {
      question: "What is the purpose of a CSS framework like Bootstrap?",
      options: ["To provide a programming language", "To provide a grid system", "To provide a database management system", "To provide styling and layout utilities"],
      answer: "To provide styling and layout utilities",
    },
    {
      question: "What is the difference between HTTP and HTTPS?",
      options: ["HTTP is faster than HTTPS", "HTTP is more secure than HTTPS", "HTTP does not encrypt data, while HTTPS encrypts data", "There is no difference"],
      answer: "HTTP does not encrypt data, while HTTPS encrypts data",
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Artificial Programming Interface"],
      answer: "Application Programming Interface",
    },
    {
      question: "Which data structure is LIFO (Last In, First Out)?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack",
    },
    {
      question: "What is the purpose of version control systems like Git?",
      options: ["To manage databases", "To manage code changes and collaborate on code", "To manage server configurations", "To manage user authentication"],
      answer: "To manage code changes and collaborate on code",
    },
    {
      question: "What is the difference between frontend and backend development?",
      options: ["There is no difference", "Frontend deals with user interfaces, while backend deals with server-side logic and databases", "Frontend is faster than backend", "Backend is used for design, while frontend is used for functionality"],
      answer: "Frontend deals with user interfaces, while backend deals with server-side logic and databases",
    },
    {
      question: "What is the role of a DNS (Domain Name System) server?",
      options: ["To manage email accounts", "To manage database queries", "To convert domain names to IP addresses", "To manage file transfers"],
      answer: "To convert domain names to IP addresses",
    },
    {
      question: "What does OOP stand for in programming?",
      options: ["Object-Oriented Programming", "Open Operating Protocol", "Operational Object Protocol", "Object-Oriented Protocol"],
      answer: "Object-Oriented Programming",
    },
    {
      question: "What is a primary key in a database?",
      options: ["A unique identifier for a record in a table", "A key used for encryption", "The first record in a table", "The main data column"],
      answer: "A unique identifier for a record in a table",
    },
    {
      question: "What is the difference between TCP and UDP?",
      options: ["TCP is connectionless, while UDP is connection-oriented", "TCP is faster than UDP", "TCP guarantees delivery of packets, while UDP does not", "There is no difference"],
      answer: "TCP guarantees delivery of packets, while UDP does not",
    },
    {
      question: "What is the purpose of a compiler?",
      options: ["To translate human-readable code into machine code", "To execute web applications", "To manage databases", "To design user interfaces"],
      answer: "To translate human-readable code into machine code",
    },
    {
      question: "What is the difference between a function declaration and a function expression in JavaScript?",
      options: ["There is no difference", "A function declaration is hoisted, while a function expression is not", "A function declaration cannot have parameters", "A function expression cannot be called"],
      answer: "A function declaration is hoisted, while a function expression is not",
    },
    {
      question: "What is the purpose of a virtual machine (VM)?",
      options: ["To simulate physical hardware within a computer", "To manage virtual reality environments", "To optimize database queries", "To design graphical user interfaces"],
      answer: "To simulate physical hardware within a computer",
    },
    {
      question: "What is a CDN (Content Delivery Network) used for?",
      options: ["To manage user authentication", "To optimize website performance by serving content from multiple locations", "To develop web applications", "To manage file uploads and downloads"],
      answer: "To optimize website performance by serving content from multiple locations",
    },
    {
      question: "What is the difference between synchronous and asynchronous programming?",
      options: ["There is no difference", "Synchronous programming executes tasks in parallel, while asynchronous programming executes tasks sequentially", "Synchronous programming waits for tasks to complete before continuing, while asynchronous programming does not block tasks", "Synchronous programming is faster than asynchronous programming"],
      answer: "Synchronous programming waits for tasks to complete before continuing, while asynchronous programming does not block tasks",
    },
    {
      question: "What is the purpose of a RESTful API?",
      options: ["To manage server configurations", "To provide a web development framework", "To build responsive web pages", "To enable communication between different software systems via standard HTTP methods"],
      answer: "To enable communication between different software systems via standard HTTP methods",
    },
    {
      question: "What is a SQL injection attack?",
      options: ["An attack on a website using social engineering", "A method to bypass firewalls", "A technique to inject malicious SQL code into a database query", "A way to exploit server vulnerabilities"],
      answer: "A technique to inject malicious SQL code into a database query",
    },
    {
      question: "What is the purpose of the 'this' keyword in JavaScript?",
      options: ["To define a new variable", "To refer to the current object", "To execute a function", "To access global variables"],
      answer: "To refer to the current object",
    },
    {
      question: "What does MVC stand for in web development?",
      options: ["Model View Controller", "Managed View Controller", "Model Visual Controller", "Multiple View Controller"],
      answer: "Model View Controller",
    },
    {
      question: "What is the purpose of a data structure like a linked list?",
      options: ["To store data in a structured format", "To manage user authentication", "To optimize database queries", "To organize data in a linear sequence"],
      answer: "To organize data in a linear sequence",
    },
    {
      question: "What is a Docker container used for?",
      options: ["To manage database queries", "To create virtual machines", "To package and run applications with their dependencies", "To optimize website performance"],
      answer: "To package and run applications with their dependencies",
    },
    {
      question: "What is the difference between HTTP and HTTP/2?",
      options: ["There is no difference", "HTTP/2 is older than HTTP", "HTTP/2 supports multiplexing and header compression, which improves page load times", "HTTP/2 is more secure than HTTP"],
      answer: "HTTP/2 supports multiplexing and header compression, which improves page load times",
    },
    {
      question: "What does AI stand for?",
      options: ["Advanced Information", "Artificial Intelligence", "Automated Interaction", "Adaptive Interface"],
      answer: "Artificial Intelligence",
    },
    {
      question: "What is the purpose of a hash table?",
      options: ["To store data in a random order", "To optimize database queries", "To manage server configurations", "To quickly retrieve data using a key-value pair"],
      answer: "To quickly retrieve data using a key-value pair",
    },
    {
      question: "What is the role of a compiler in programming?",
      options: ["To convert human-readable code into machine code", "To manage databases", "To design user interfaces", "To execute web applications"],
      answer: "To convert human-readable code into machine code",
    },
    {
      question: "What is the difference between encryption and hashing?",
      options: ["There is no difference", "Encryption is reversible, while hashing is not", "Hashing is used for authentication, while encryption is used for data storage", "Encryption is faster than hashing"],
      answer: "Encryption is reversible, while hashing is not",
    },
    {
      question: "What is the purpose of a VPN (Virtual Private Network)?",
      options: ["To manage server configurations", "To provide secure remote access to private networks", "To optimize website performance", "To develop web applications"],
      answer: "To provide secure remote access to private networks",
    },
    {
      question: "What is the role of a database management system (DBMS)?",
      options: ["To manage virtual machines", "To simulate physical hardware", "To manage databases and facilitate data organization", "To optimize website performance"],
      answer: "To manage databases and facilitate data organization",
    },
    {
      question: "What is the difference between HTTP and HTTPS?",
      options: ["HTTP is faster than HTTPS", "HTTP is more secure than HTTPS", "HTTP does not encrypt data, while HTTPS encrypts data", "There is no difference"],
      answer: "HTTP does not encrypt data, while HTTPS encrypts data",
    },
    {
      question: "What is the purpose of unit testing in software development?",
      options: ["To test the entire system as a whole", "To validate individual units or components of code", "To manage user authentication", "To optimize database queries"],
      answer: "To validate individual units or components of code",
    },
    {
      question: "What does API stand for?",
      options: ["Automated Programming Interface", "Advanced Programming Interface", "Application Programming Interface", "Artificial Programming Interface"],
      answer: "Application Programming Interface",
    },
    {
      question: "What is the purpose of responsive web design?",
      options: ["To manage server configurations", "To optimize website performance", "To develop web applications", "To create web pages that adapt to different devices and screen sizes"],
      answer: "To create web pages that adapt to different devices and screen sizes",
    },
    {
      question: "What is the role of a content management system (CMS)?",
      options: ["To manage databases", "To design user interfaces", "To optimize website performance", "To create and manage digital content"],
      answer: "To create and manage digital content",
    },
    {
      question: "What is the purpose of a CDN (Content Delivery Network)?",
      options: ["To manage user authentication", "To optimize website performance by serving content from multiple locations", "To develop web applications", "To manage file uploads and downloads"],
      answer: "To optimize website performance by serving content from multiple locations",
    },
    {
      question: "What is the difference between frontend and backend development?",
      options: ["There is no difference", "Frontend is responsible for user interfaces, while backend handles server-side logic and databases", "Frontend is faster than backend", "Backend is used for design, while frontend is used for functionality"],
      answer: "Frontend is responsible for user interfaces, while backend handles server-side logic and databases",
    },
    {
      question: "What is the purpose of a firewall?",
      options: ["To manage database queries", "To protect a network from unauthorized access", "To optimize website performance", "To create virtual machines"],
      answer: "To protect a network from unauthorized access",
    },
    {
      question: "What is the difference between HTTP and WebSocket?",
      options: ["There is no difference", "WebSocket is faster than HTTP", "WebSocket allows for bidirectional communication between client and server, while HTTP is unidirectional", "WebSocket is used for static content, while HTTP is used for dynamic content"],
      answer: "WebSocket allows for bidirectional communication between client and server, while HTTP is unidirectional",
    },
    {
      question: "What is the purpose of version control systems like Git?",
      options: ["To manage databases", "To manage code changes and collaborate on code", "To manage server configurations", "To manage user authentication"],
      answer: "To manage code changes and collaborate on code",
    },
    {
      question: "What is the role of a web server?",
      options: ["To manage virtual machines", "To simulate physical hardware", "To serve web pages to clients upon request", "To optimize website performance"],
      answer: "To serve web pages to clients upon request",
    },
    {
      question: "What is the difference between TCP and UDP?",
      options: ["TCP is connectionless, while UDP is connection-oriented", "TCP is faster than UDP", "TCP guarantees delivery of packets, while UDP does not", "There is no difference"],
      answer: "TCP guarantees delivery of packets, while UDP does not",
    },
    {
      question: "What is the purpose of a data structure like a queue?",
      options: ["To store data in a structured format", "To manage user authentication", "To optimize database queries", "To manage tasks in a first-in, first-out (FIFO) manner"],
      answer: "To manage tasks in a first-in, first-out (FIFO) manner",
    },
    {
      question: "What is the role of a compiler in programming?",
      options: ["To translate human-readable code into machine code", "To manage databases", "To design user interfaces", "To execute web applications"],
      answer: "To translate human-readable code into machine code",
    },
    {
      question: "What is the purpose of hashing algorithms like SHA-256?",
      options: ["To manage database queries", "To optimize website performance", "To ensure data integrity and security", "To develop web applications"],
      answer: "To ensure data integrity and security",
    },
    {
      question: "What is the difference between synchronous and asynchronous programming?",
      options: ["There is no difference", "Synchronous programming executes tasks in parallel, while asynchronous programming executes tasks sequentially", "Synchronous programming waits for tasks to complete before continuing, while asynchronous programming does not block tasks", "Synchronous programming is faster than asynchronous programming"],
      answer: "Synchronous programming waits for tasks to complete before continuing, while asynchronous programming does not block tasks",
    },
    {
      question: "What is the purpose of a relational database?",
      options: ["To store data in a hierarchical format", "To optimize website performance", "To manage data based on predefined relationships between tables", "To develop web applications"],
      answer: "To manage data based on predefined relationships between tables",
    },
    {
      question: "What is the role of a reverse proxy server?",
      options: ["To manage database queries", "To optimize website performance", "To protect a server by intercepting requests", "To simulate physical hardware"],
      answer: "To protect a server by intercepting requests",
    },
    {
      question: "What is the difference between HTTP and HTTPS?",
      options: ["HTTP is faster than HTTPS", "HTTP is more secure than HTTPS", "HTTP does not encrypt data, while HTTPS encrypts data", "There is no difference"],
      answer: "HTTP does not encrypt data, while HTTPS encrypts data",
    },
    {
      question: "What is the purpose of a software framework like Angular?",
      options: ["To manage databases", "To optimize website performance", "To develop web applications with predefined structures and components", "To create virtual machines"],
      answer: "To develop web applications with predefined structures and components",
    },
    {
      question: "What does API stand for?",
      options: ["Automated Programming Interface", "Advanced Programming Interface", "Application Programming Interface", "Artificial Programming Interface"],
      answer: "Application Programming Interface",
    },
    {
      question: "What is the purpose of responsive web design?",
      options: ["To manage server configurations", "To optimize website performance", "To develop web applications", "To create web pages that adapt to different devices and screen sizes"],
      answer: "To create web pages that adapt to different devices and screen sizes",
    },
    {
      question: "What is the role of a content management system (CMS)?",
      options: ["To manage databases", "To design user interfaces", "To optimize website performance", "To create and manage digital content"],
      answer: "To create and manage digital content",
    },
    {
      question: "What is the purpose of a CDN (Content Delivery Network)?",
      options: ["To manage user authentication", "To optimize website performance by serving content from multiple locations", "To develop web applications", "To manage file uploads and downloads"],
      answer: "To optimize website performance by serving content from multiple locations",
    },
    {
      question: "What is the difference between frontend and backend development?",
      options: ["There is no difference", "Frontend is responsible for user interfaces, while backend handles server-side logic and databases", "Frontend is faster than backend", "Backend is used for design, while frontend is used for functionality"],
      answer: "Frontend is responsible for user interfaces, while backend handles server-side logic and databases",
    },
    {
      question: "What is the purpose of a firewall?",
      options: ["To manage database queries", "To protect a network from unauthorized access", "To optimize website performance", "To create virtual machines"],
      answer: "To protect a network from unauthorized access",
    },
    {
      question: "What is the difference between HTTP and WebSocket?",
      options: ["There is no difference", "WebSocket is faster than HTTP", "WebSocket allows for bidirectional communication between client and server, while HTTP is unidirectional", "WebSocket is used for static content, while HTTP is used for dynamic content"],
      answer: "WebSocket allows for bidirectional communication between client and server, while HTTP is unidirectional",
    },
    {
      question: "What is the purpose of version control systems like Git?",
      options: ["To manage databases", "To manage code changes and collaborate on code", "To manage server configurations", "To manage user authentication"],
      answer: "To manage code changes and collaborate on code",
    },
    {
      question: "What is the role of a web server?",
      options: ["To manage virtual machines", "To simulate physical hardware", "To serve web pages to clients upon request", "To optimize website performance"],
      answer: "To serve web pages to clients upon request",
    },
    {
      question: "What is the difference between TCP and UDP?",
      options: ["TCP is connectionless, while UDP is connection-oriented", "TCP is faster than UDP", "TCP guarantees delivery of packets, while UDP does not", "There is no difference"],
      answer: "TCP guarantees delivery of packets, while UDP does not",
    },
    {
      question: "What is the purpose of a data structure like a queue?",
      options: ["To store data in a structured format", "To manage user authentication", "To optimize database queries", "To manage tasks in a first-in, first-out (FIFO) manner"],
      answer: "To manage tasks in a first-in, first-out (FIFO) manner",
    },
    {
      question: "What is the role of a compiler in programming?",
      options: ["To translate human-readable code into machine code", "To manage databases", "To design user interfaces", "To execute web applications"],
      answer: "To translate human-readable code into machine code",
    },
    {
      question: "What is the purpose of hashing algorithms like SHA-256?",
      options: ["To manage database queries", "To optimize website performance", "To ensure data integrity and security", "To develop web applications"],
      answer: "To ensure data integrity and security",
    },
    {
      question: "What is the difference between synchronous and asynchronous programming?",
      options: ["There is no difference", "Synchronous programming executes tasks in parallel, while asynchronous programming executes tasks sequentially", "Synchronous programming waits for tasks to complete before continuing, while asynchronous programming does not block tasks", "Synchronous programming is faster than asynchronous programming"],
      answer: "Synchronous programming waits for tasks to complete before continuing, while asynchronous programming does not block tasks",
    },
    {
      question: "What is the purpose of a relational database?",
      options: ["To store data in a hierarchical format", "To optimize website performance", "To manage data based on predefined relationships between tables", "To develop web applications"],
      answer: "To manage data based on predefined relationships between tables",
    },
    {
      question: "What is the role of a reverse proxy server?",
      options: ["To manage database queries", "To optimize website performance", "To protect a server by intercepting requests", "To simulate physical hardware"],
      answer: "To protect a server by intercepting requests",
    },
    {
      question: "What is the difference between HTTP and HTTPS?",
      options: ["HTTP is faster than HTTPS", "HTTP is more secure than HTTPS", "HTTP does not encrypt data, while HTTPS encrypts data", "There is no difference"],
      answer: "HTTP does not encrypt data, while HTTPS encrypts data",
    },
    {
      question: "What is the purpose of a software framework like Angular?",
      options: ["To manage databases", "To optimize website performance", "To develop web applications with predefined structures and components", "To create virtual machines"],
      answer: "To develop web applications with predefined structures and components",
    },
    {
      question: "What does API stand for?",
      options: ["Automated Programming Interface", "Advanced Programming Interface", "Application Programming Interface", "Artificial Programming Interface"],
      answer: "Application Programming Interface",
    },
    {
      question: "What is the purpose of responsive web design?",
      options: ["To manage server configurations", "To optimize website performance", "To develop web applications", "To create web pages that adapt to different devices and screen sizes"],
      answer: "To create web pages that adapt to different devices and screen sizes",
    },
    {
      question: "What is the role of a content management system (CMS)?",
      options: ["To manage databases", "To design user interfaces", "To optimize website performance", "To create and manage digital content"],
      answer: "To create and manage digital content",
    },
    {
      question: "What is the purpose of a CDN (Content Delivery Network)?",
      options: ["To manage user authentication", "To optimize website performance by serving content from multiple locations", "To develop web applications", "To manage file uploads and downloads"],
      answer: "To optimize website performance by serving content from multiple locations",
    },
    {
      question: "What is the difference between frontend and backend development?",
      options: ["There is no difference", "Frontend is responsible for user interfaces, while backend handles server-side logic and databases", "Frontend is faster than backend", "Backend is used for design, while frontend is used for functionality"],
      answer: "Frontend is responsible for user interfaces, while backend handles server-side logic and databases",
    },
    {
      question: "What is the purpose of a firewall?",
      options: ["To manage database queries", "To protect a network from unauthorized access", "To optimize website performance", "To create virtual machines"],
      answer: "To protect a network from unauthorized access",
    },
    {
      question: "What is the difference between HTTP and WebSocket?",
      options: ["There is no difference", "WebSocket is faster than HTTP", "WebSocket allows for bidirectional communication between client and server, while HTTP is unidirectional", "WebSocket is used for static content, while HTTP is used for dynamic content"],
      answer: "WebSocket allows for bidirectional communication between client and server, while HTTP is unidirectional",
    },
    {
      question: "What is the purpose of version control systems like Git?",
      options: ["To manage databases", "To manage code changes and collaborate on code", "To manage server configurations", "To manage user authentication"],
      answer: "To manage code changes and collaborate on code",
    },
    {
      question: "What is the role of a web server?",
      options: ["To manage virtual machines", "To simulate physical hardware", "To serve web pages to clients upon request", "To optimize website performance"],
      answer: "To serve web pages to clients upon request",
    },
    {
      question: "What is the difference between TCP and UDP?",
      options: ["TCP is connectionless, while UDP is connection-oriented", "TCP is faster than UDP", "TCP guarantees delivery of packets, while UDP does not", "There is no difference"],
      answer: "TCP guarantees delivery of packets, while UDP does not",
    },
    {
      question: "What is the purpose of a data structure like a queue?",
      options: ["To store data in a structured format", "To manage user authentication", "To optimize database queries", "To manage tasks in a first-in, first-out (FIFO) manner"],
      answer: "To manage tasks in a first-in, first-out (FIFO) manner",
    },
    {
      question: "What is the role of a compiler in programming?",
      options: ["To translate human-readable code into machine code", "To manage databases", "To design user interfaces", "To execute web applications"],
      answer: "To translate human-readable code into machine code",
    },
    {
      question: "What is the purpose of hashing algorithms like SHA-256?",
      options: ["To manage database queries", "To optimize website performance", "To ensure data integrity and security", "To develop web applications"],
      answer: "To ensure data integrity and security",
    },
    {
      question: "What is the difference between synchronous and asynchronous programming?",
      options: ["There is no difference", "Synchronous programming executes tasks in parallel, while asynchronous programming executes tasks sequentially", "Synchronous programming waits for tasks to complete before continuing, while asynchronous programming does not block tasks", "Synchronous programming is faster than asynchronous programming"],
      answer: "Synchronous programming waits for tasks to complete before continuing, while asynchronous programming does not block tasks",
    },
    {
      question: "What is the purpose of a relational database?",
      options: ["To store data in a hierarchical format", "To optimize website performance", "To manage data based on predefined relationships between tables", "To develop web applications"],
      answer: "To manage data based on predefined relationships between tables",
    },
    {
      question: "What is the role of a reverse proxy server?",
      options: ["To manage database queries", "To optimize website performance", "To protect a server by intercepting requests", "To simulate physical hardware"],
      answer: "To protect a server by intercepting requests",
    },
    {
      question: "What is the difference between HTTP and HTTPS?",
      options: ["HTTP is faster than HTTPS", "HTTP is more secure than HTTPS", "HTTP does not encrypt data, while HTTPS encrypts data", "There is no difference"],
      answer: "HTTP does not encrypt data, while HTTPS encrypts data",
    },
    {
      question: "What is the purpose of a software framework like Angular?",
      options: ["To manage databases", "To optimize website performance", "To develop web applications with predefined structures and components", "To create virtual machines"],
      answer: "To develop web applications with predefined structures and components",
    },
    // Add more questions as needed
  ];
  
  export default questions;
  