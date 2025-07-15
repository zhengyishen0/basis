export async function GET() {
  const testData = {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 28,
    isPremium: true,
    todos: [
      { id: 1, title: "Learn HTMX-JSON", completed: true },
      { id: 2, title: "Build awesome features", completed: false },
      { id: 3, title: "Test all attributes", completed: false },
      { id: 4, title: "Deploy to production", completed: false }
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/johndoe" },
      { platform: "Twitter", url: "https://twitter.com/johndoe" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" }
    ],
    styleDemo: {
      text: "Dynamically Styled!",
      bgColor: "#4f46e5",
      textColor: "#ffffff",
      padding: "1rem 2rem",
      borderRadius: "0.5rem"
    },
    features: {
      showWelcome: true,
      hidePromo: false
    },
    company: {
      name: "Tech Solutions Inc.",
      address: {
        street: "123 Tech Street",
        city: "San Francisco",
        state: "CA",
        zip: "94105"
      },
      employees: [
        { id: 1, name: "Alice Johnson", position: "CEO" },
        { id: 2, name: "Bob Smith", position: "CTO" },
        { id: 3, name: "Carol Williams", position: "Lead Developer" }
      ]
    },
    formData: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      bio: "Full-stack developer passionate about building great user experiences with modern web technologies."
    }
  };

  return new Response(JSON.stringify(testData), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}