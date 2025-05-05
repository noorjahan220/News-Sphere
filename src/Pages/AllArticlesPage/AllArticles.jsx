import React, { useState, useEffect } from 'react';
import Article from './Article';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { FiFilter, FiSearch, FiX, FiLoader, FiGrid, FiTag, FiBookOpen, FiTrendingUp } from 'react-icons/fi';

const AllArticles = () => {
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const fetchArticles = async () => {
    const response = await axiosPublic.get('/news');
    return response.data;
  };

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    keepPreviousData: true,
  });

  const availableTags = [...new Set(articles.flatMap(article => article.tags))];
  const availablePublishers = [...new Set(articles.map(article => article.publisher))];

  const filteredArticles = articles.filter(article => {
    const tagMatch = selectedTag ? article.tags.includes(selectedTag) : true;
    const publisherMatch = selectedPublisher ? article.publisher === selectedPublisher : true;
    const searchMatch = searchQuery
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.Description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return tagMatch && publisherMatch && searchMatch;
  });

  // Clear all filters
  const clearFilters = () => {
    setSelectedTag('');
    setSelectedPublisher('');
    setSearchQuery('');
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="flex flex-col items-center">
        <FiLoader className="animate-spin text-amber-500 text-4xl mb-4" />
        <p className="text-gray-400">Loading articles...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 bg-zinc-900 text-red-400">
      <FiX className="text-4xl mb-4" />
      <h3 className="text-xl font-bold">Error fetching articles</h3>
      <p className="text-gray-400 mt-2">{error.message}</p>
    </div>
  );

  return (
    <div className="bg-zinc-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile filter dialog */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-zinc-800 py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4 border-b border-zinc-700 pb-4">
                <h2 className="text-lg font-medium text-amber-500">Filters</h2>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-700 text-gray-400 hover:text-white"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <FiX className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile Filters */}
              <div className="mt-4 px-4 py-6">
                <h3 className="flex items-center font-medium text-gray-300 mb-3">
                  <FiTag className="mr-2" /> Tags
                </h3>
                <div className="pt-2">
                  <div className="space-y-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedTag('')}
                      className={`px-3 py-1.5 rounded text-sm ${!selectedTag ? 'bg-amber-600 text-white' : 'bg-zinc-700 text-gray-300 border border-zinc-600'}`}
                    >
                      All
                    </button>
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTag(tag);
                          setMobileFiltersOpen(false);
                        }}
                        className={`px-3 py-1.5 rounded text-sm ${selectedTag === tag ? 'bg-amber-600 text-white' : 'bg-zinc-700 text-gray-300 border border-zinc-600'}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-700 px-4 py-6">
                <h3 className="flex items-center font-medium text-gray-300 mb-3">
                  <FiBookOpen className="mr-2" /> Publishers
                </h3>
                <div className="pt-2">
                  <div className="space-y-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedPublisher('')}
                      className={`px-3 py-1.5 rounded text-sm ${!selectedPublisher ? 'bg-amber-600 text-white' : 'bg-zinc-700 text-gray-300 border border-zinc-600'}`}
                    >
                      All
                    </button>
                    {availablePublishers.map((publisher) => (
                      <button
                        key={publisher}
                        onClick={() => {
                          setSelectedPublisher(publisher);
                          setMobileFiltersOpen(false);
                        }}
                        className={`px-3 py-1.5 rounded text-sm ${selectedPublisher === publisher ? 'bg-amber-600 text-white' : 'bg-zinc-700 text-gray-300 border border-zinc-600'}`}
                      >
                        {publisher}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-700 px-4 py-6">
                <button
                  onClick={() => {
                    clearFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded-md flex items-center justify-center"
                >
                  <FiX className="mr-2" />
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="mx-auto">
          {/* Title and search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-700 pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center mb-4 md:mb-0">
              <FiTrendingUp className="mr-3 text-amber-500" />
              Latest Articles
            </h1>
            <div className="flex items-center">
              <button
                type="button"
                className="mr-4 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-amber-500 py-2 px-4 rounded-md lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FiFilter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          <section aria-labelledby="articles-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters - Desktop */}
              <div className="hidden lg:block">
                <div className="sticky top-4 space-y-6">
                  <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden border border-zinc-700">
                    <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 px-4 py-3 border-b border-zinc-700">
                      <h3 className="text-lg font-medium text-amber-500 flex items-center">
                        <FiFilter className="mr-2" />
                        Filters
                      </h3>
                    </div>
                    
                    <div className="p-4">
                      {/* Search */}
                      <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2.5 border border-zinc-600 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Search articles..."
                        />
                      </div>

                      {/* Tags Filter */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                          <FiTag className="mr-2 text-amber-500" />
                          Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedTag('')}
                            className={`px-3 py-1.5 rounded text-sm ${!selectedTag ? 'bg-amber-600 text-white' : 'bg-zinc-700 text-gray-300 border border-zinc-600 hover:bg-zinc-600'}`}
                          >
                            All
                          </button>
                          {availableTags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setSelectedTag(tag)}
                              className={`px-3 py-1.5 rounded text-sm ${selectedTag === tag ? 'bg-amber-600 text-white' : 'bg-zinc-700 text-gray-300 border border-zinc-600 hover:bg-zinc-600'}`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Publisher Filter */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                          <FiBookOpen className="mr-2 text-amber-500" />
                          Publishers
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedPublisher('')}
                            className={`px-3 py-1.5 rounded text-sm ${!selectedPublisher ? 'bg-amber-600 text-white' : 'bg-zinc-700 text-gray-300 border border-zinc-600 hover:bg-zinc-600'}`}
                          >
                            All
                          </button>
                          {availablePublishers.map((publisher) => (
                            <button
                              key={publisher}
                              onClick={() => setSelectedPublisher(publisher)}
                              className={`px-3 py-1.5 rounded text-sm ${selectedPublisher === publisher ? 'bg-amber-600 text-white' : 'bg-zinc-700 text-gray-300 border border-zinc-600 hover:bg-zinc-600'}`}
                            >
                              {publisher}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Clear Filters */}
                      {(selectedTag || selectedPublisher || searchQuery) && (
                        <button
                          onClick={clearFilters}
                          className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded flex items-center justify-center"
                        >
                          <FiX className="mr-2" />
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Article grid */}
              <div className="lg:col-span-3">
                {/* Search - Mobile */}
                <div className="lg:hidden relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Search articles..."
                  />
                </div>

                {/* Results info bar */}
                <div className="flex items-center justify-between mb-6 p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                  <div className="text-sm text-gray-400 flex items-center">
                    <FiGrid className="mr-2 text-amber-500" />
                    Showing <span className="mx-1 font-medium text-white">{filteredArticles.length}</span> 
                    {filteredArticles.length === 1 ? 'article' : 'articles'}
                    {(selectedTag || selectedPublisher || searchQuery) && (
                      <span className="ml-1">
                        with filters
                      </span>
                    )}
                  </div>
                  
                  {/* Active filters display */}
                  {(selectedTag || selectedPublisher) && (
                    <div className="flex items-center space-x-2">
                      {selectedTag && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-600/20 text-amber-400 border border-amber-700">
                          #{selectedTag}
                          <button onClick={() => setSelectedTag('')} className="ml-1.5 text-amber-300 hover:text-amber-100">
                            <FiX size={14} />
                          </button>
                        </span>
                      )}
                      
                      {selectedPublisher && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-600/20 text-amber-400 border border-amber-700">
                          {selectedPublisher}
                          <button onClick={() => setSelectedPublisher('')} className="ml-1.5 text-amber-300 hover:text-amber-100">
                            <FiX size={14} />
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Articles */}
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-16 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <FiSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-300 mb-2">No articles found</h3>
                    <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                    <button 
                      onClick={clearFilters}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      <FiX className="mr-2 h-4 w-4" />
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <Article key={article._id} article={article} subscriptionStatus={subscriptionStatus} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AllArticles;