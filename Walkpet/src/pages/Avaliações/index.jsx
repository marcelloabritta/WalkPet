import React from 'react';

function ReviewCard({ name, review, rating, onContactClick }) {
  return (
    <div style={styles.reviewCard}>
      <p style={styles.reviewText}>"{review}"</p>
      <div style={styles.profileSection}>
      <img
  src="https://via.placeholder.com/100"
  alt={`${name} profile`}
  style={styles.profileImage}
/>
        <h3 style={styles.name}>{name}</h3>
        <div style={styles.rating}>
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
        <button style={styles.contactButton} onClick={onContactClick}>
          Entre em contato
        </button>
      </div>
    </div>
  );
}

function App() {
  const handleContactClick = () => {
    alert("Entrando em contato com Bernardo!");
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.logo}>WalkPet</h1>
      </header>
      <main style={styles.main}>
        <h2 style={styles.title}>Avaliações</h2>
        <div style={styles.carousel}>
          <button style={styles.arrowButton}>&lt;</button>
          <ReviewCard
            name="Bernardo"
            review="Bernardo é excelente. Foi pontual e compreensivo com as necessidades especiais do meu cachorro pingo. Com certeza contratarei novamente."
            rating={5}
            onContactClick={handleContactClick}
          />
          <button style={styles.arrowButton}>&gt;</button>
        </div>
        <p style={styles.leaveReview}>Deixe sua avaliação aqui</p>
      </main>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f0f5f7',
    padding: '20px',
  },
  header: {
    backgroundColor: '#8EE0C2',
    padding: '10px 20px',
  },
  logo: {
    fontSize: '24px',
    color: '#1F3D3D',
  },
  main: {
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#1F3D3D',
    marginBottom: '20px',
  },
  carousel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  arrowButton: {
    fontSize: '24px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  reviewCard: {
    backgroundColor: '#FFC1C1',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'left',
  },
  reviewText: {
    fontSize: '16px',
    color: '#1F3D3D',
    marginBottom: '20px',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  name: {
    fontSize: '18px',
    color: '#1F3D3D',
    marginBottom: '5px',
  },
  rating: {
    fontSize: '20px',
    color: '#1F3D3D',
    marginBottom: '10px',
  },
  contactButton: {
    backgroundColor: '#8EE0C2',
    color: '#1F3D3D',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  leaveReview: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#8EE0C2',
    cursor: 'pointer',
  },
};

export default App;