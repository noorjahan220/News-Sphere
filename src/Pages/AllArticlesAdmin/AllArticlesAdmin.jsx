import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get('/pending-articles')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pending articles:', error);
      });
  }, []);

  // In AllArticlesAdmin component
const handleApprove = (id) => {
  axiosSecure.put(`/approve-article/${id}`).then(() => {
    setArticles(articles.map((article) => article._id === id ? { ...article, isApproved: true } : article));
  }).catch(error => console.error(error));
};

const handleDecline = (id) => {
  setSelectedArticle(id);
  setModalIsOpen(true);
};

const handleDeclineSubmit = () => {
  axiosSecure.patch(`/articles/decline/${selectedArticle}`, { reason: declineReason })
    .then(() => {
      setArticles(articles.map((article) =>
        article._id === selectedArticle
          ? { ...article, isApproved: false, declineReason }
          : article
      ));
      setModalIsOpen(false);
    })
    .catch((error) => console.error(error));
};

const handleMakePremium = (id) => {
  axiosSecure.patch(`/articles/premium/${id}`).then(() => {
    setArticles(articles.map((article) =>
      article._id === id ? { ...article, isPremium: true } : article
    ));
  }).catch(error => console.error(error));
};

  

const handleDelete = (id) => {
  // Find the article by id to check if it is approved
  const articleToDelete = articles.find(article => article._id === id);
  
  // Only allow deletion if the article is not approved
  if (articleToDelete && !articleToDelete.isApproved) {
    axiosSecure.delete(`/articles/${id}`).then(() => {
      setArticles(articles.filter((article) => article._id !== id));
    }).catch(error => console.error(error));
  } else {
    alert('Approved articles cannot be deleted.');
  }
};

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Posted Date</th>
            <th>Status</th>
            <th>Publisher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>
                <div>{article.authorName}</div>
                <div>{article.authorEmail}</div>
                <img src={article.authorPhoto} alt={article.authorName} width={50} />
              </td>
              <td>{new Date(article.createdAt).toLocaleDateString()}</td>
              <td>
                {article.approved ? (
                  <span>Approved</span>
                ) : article.declineReason ? (
                  <>
                    <span>Declined</span>
                    <button onClick={() => handleDecline(article._id)}>View Reason</button>
                  </>
                ) : (
                  <span>Pending</span>
                )}
              </td>
              <td>{article.publisher}</td>
              <td>
                {!article.approved && (
                  <button onClick={() => handleApprove(article._id)}>Approve</button>
                )}
                <button onClick={() => handleDecline(article._id)}>Decline</button>
                <button onClick={() => handleMakePremium(article._id)} disabled={article.premium}>
                  {article.premium ? 'Premium' : 'Make Premium'}
                </button>
                <button onClick={() => handleDelete(article._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Decline Reason */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Decline Reason</h2>
        <textarea
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
          placeholder="Enter reason"
        />
        <button onClick={handleDeclineSubmit}>Submit</button>
      </Modal>
    </div>
  );
};

export default AllArticlesAdmin;
