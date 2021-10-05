// imports
import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import axios from 'axios';
import { API } from '../../../config';
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';
/*
handle change title
handle change url
handle change type
handle change medium
handle submit > post request to server
show categories > checkbox
show types > radio buttons
show medium > radio buttons
handle toggle > selecting categories
link create form
return > show create forms, categories checkbox, radio buttons, success/error messages etc
get token of the logged in user - required to create link
 */

const Create = () => {
  // state
  const [state, setState] = useState({
    title: '',
    url: '',
    categories: [],
    loadedCategories: [],
    success: '',
    error: '',
    type: '',
    medium: '',
  });

  const {
    title,
    url,
    categories,
    loadedCategories,
    success,
    error,
    type,
    medium,
  } = state;

  // load categories when component mounts using useEffect
  useEffect(() => {
    loadCategories();
  }, [success]);

  const loadCategories = async () => {
    const response = await axios.get(`${API}/categories`);
    setState({ ...state, loadedCategories: response.data });
  };

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-12'>
          <h1>Submit Link/URL</h1>
          <br />
          {JSON.stringify(loadedCategories)}
        </div>
      </div>
    </Layout>
  );
};

export default Create;
