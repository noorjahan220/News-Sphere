import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AllArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const axiosSecure = useAxiosSecure();
console.log(articles)
  useEffect(() => {
    axiosSecure
      .get('/pending-articles') // Fetch the list of pending articles
      .then((response) => {
        setArticles(response.data); // Set the articles data into state
      })
      .catch((error) => {
        console.error('Error fetching pending articles:', error);
      });
  }, []);

  // Handle the approval of an article
  const handleApprove = (id) => {
    axiosSecure.put(`/approve-article/${id}`).then(() => {
      setArticles(articles.map((article) => article._id === id ? { ...article, isApproved: true } : article));
      Swal.fire('Success!', 'Article has been approved.', 'success'); // Success alert
    }).catch((error) => {
      console.error(error);
      Swal.fire('Error!', 'There was an issue approving the article.', 'error'); // Error alert
    });
  };

  // Handle declining an article with a reason
  const handleDecline = (id) => {
    setSelectedArticle(id);
    setModalIsOpen(true); // Open the modal to input a decline reason
  };

  // Submit the decline reason and update article status
  const handleDeclineSubmit = () => {
    axiosSecure.patch(`/articles/decline/${selectedArticle}`, { reason: declineReason })
      .then(() => {
        setArticles(articles.map((article) =>
          article._id === selectedArticle
            ? { ...article, isApproved: false, declineReason }
            : article
        ));
        setModalIsOpen(false); // Close the modal after submission
        setDeclineReason(''); // Reset decline reason
        Swal.fire('Success!', 'Article has been declined with reason.', 'success'); // Success alert
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('Error!', 'There was an issue declining the article.', 'error'); // Error alert
      });
  };

  // Handle marking an article as premium
  const handleMakePremium = (id) => {
    axiosSecure.patch(`/articles/premium/${id}`).then(() => {
      setArticles(articles.map((article) =>
        article._id === id ? { ...article, isPremium: true } : article
      ));
      Swal.fire('Success!', 'Article has been marked as Premium.', 'success'); // Success alert
    }).catch((error) => {
      console.error(error);
      Swal.fire('Error!', 'There was an issue marking the article as Premium.', 'error'); // Error alert
    });
  };

  // Handle deleting an article (only if not approved)
  const handleDelete = (id) => {
    const articleToDelete = articles.find(article => article._id === id);

    if (articleToDelete && !articleToDelete.isApproved) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/articles/${id}`).then(() => {
            setArticles(articles.filter((article) => article._id !== id));
            Swal.fire('Deleted!', 'The article has been deleted.', 'success');
          }).catch((error) => {
            console.error(error);
            Swal.fire('Error!', 'There was an issue deleting the article.', 'error');
          });
        }
      });
    } else {
      Swal.fire('Error!', 'Approved articles cannot be deleted.', 'error');
    }
  };

  return (
    <div className="pt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">Pending Articles</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Publisher</th>
            <th className="border border-gray-300 px-4 py-2">Posted Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={article._id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{article.title}</td>
              <td className="border border-gray-300 px-4 py-2">{article.publisher}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(article.createdAt).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex justify-start space-x-2"> {/* Flex container with spacing between buttons */}
                  {article.isApproved ? (
                    <span className="text-green-500">Approved</span>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleApprove(article._id)}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDecline(article._id)}
                  >
                    Decline
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleMakePremium(article._id)}
                  >
                    Make Premium
                  </button>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Decline Modal */}
      {modalIsOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Provide a Reason for Decline</h2>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-4"
              rows="4"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleDeclineSubmit}
              >
                Submit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllArticlesAdmin;
