// course.js
// Handle course display, filtering, and credit calculation

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

let currentFilter = 'all';

// Initialize courses display
document.addEventListener('DOMContentLoaded', function() {
    displayCourses(courses);
    setupFilterButtons();
});

// Display courses dynamically
function displayCourses(coursesToDisplay) {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <div class="course-code">${course.subject} ${course.number}</div>
            <div class="course-credits">Credits: ${course.credits}</div>
            <p>${course.description}</p>
            <div class="course-tech">Technologies: ${course.technology.join(', ')}</div>
        `;

        container.appendChild(courseCard);
    });

    // Update total credits
    updateTotalCredits(coursesToDisplay);
}

// Filter courses by subject
function filterCourses(subject) {
    currentFilter = subject;
    let filteredCourses;

    if (subject === 'all') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.subject === subject);
    }

    displayCourses(filteredCourses);
}

// Update filter button states
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter courses
            const filter = this.getAttribute('data-filter');
            filterCourses(filter.toUpperCase() === 'ALL' ? 'all' : filter.toUpperCase());
        });
    });
}

// Calculate and update total credits
function updateTotalCredits(coursesToDisplay) {
    const totalCredits = coursesToDisplay.reduce((sum, course) => sum + course.credits, 0);
    const creditsElement = document.getElementById('total-credits');
    
    if (creditsElement) {
        creditsElement.textContent = totalCredits;
    }
}