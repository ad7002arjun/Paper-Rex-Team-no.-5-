// seed.js — Run: node seed.js
// Pre-populates MongoDB with Paper Rex team members
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/paperrex', {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected for seeding...'));

const memberSchema = new mongoose.Schema({
  name: String, regNo: String, year: String, degree: String, section: String,
  role: String, email: String, project: String, hobbies: String,
  certificate: String, internship: String, aboutYourAim: String, image: String,
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

const members = [
  {
    name: 'Arjun Dogra',
    regNo: 'RA2311056010243',
    year: '3rd Year',
    degree: 'B.Tech CSE Data Science',
    section: 'AO1',
    role: 'Full Stack Developer',
    email: 'arjundogra@srmist.edu.in',
    project: 'Green Habits — A web app to track and promote eco-friendly daily habits using data analytics.',
    hobbies: 'Competitive Programming, Chess, Trekking, Photography, Reading Sci-Fi',
    certificate: 'AWS Cloud Practitioner, React Developer Certification',
    internship: 'Full Stack Intern at GreenTech Solutions, Bangalore',
    aboutYourAim: 'To build scalable, impactful tech products that address real-world environmental challenges and contribute to a sustainable future.',
    image: '',
  },
  {
    name: 'Nishtha Goyal',
    regNo: 'RA2311056010212',
    year: '3rd Year',
    degree: 'B.Tech CSE Data Science',
    section: 'AO1',
    role: 'Data Analyst & Backend Developer',
    email: 'nishthagoyalrao@srmist.edu.in',
    project: 'Green Habits — Leveraging ML models to analyze user behavior patterns and suggest personalized sustainability goals.',
    hobbies: 'Machine Learning, Journaling, Yoga, Cooking, Binge-watching Documentaries',
    certificate: 'Google Data Analytics Certificate, Python for Data Science – IBM',
    internship: 'Data Science Intern at EcoMetrics, Hyderabad',
    aboutYourAim: 'To harness the power of data to drive meaningful decisions in healthcare and climate tech, and inspire more women into STEM.',
    image: '',
  },
  {
    name: 'Sam Selvam',
    regNo: 'RA2311056010240',
    year: '3rd Year',
    degree: 'B.Tech CSE Data Science',
    section: 'AO1',
    role: 'UI/UX Designer & Frontend Developer',
    email: 'samselvam@srmist.edu.in',
    project: 'Green Habits — Designing intuitive interfaces and visual dashboards that motivate users to adopt greener lifestyles.',
    hobbies: 'UI Design, Sketching, Football, Music Production, Speedcubing',
    certificate: 'Google UX Design Certificate, Figma Advanced UI – Coursera',
    internship: 'Frontend Design Intern at PixelCraft Studio, Chennai',
    aboutYourAim: 'To merge design thinking with technology to create products that are not only beautiful but genuinely accessible and inclusive for all users.',
    image: '',
  },
];

async function seed() {
  await Member.deleteMany({});
  await Member.insertMany(members);
  console.log('✅ Seeded 3 Paper Rex team members!');
  mongoose.disconnect();
}

seed();
