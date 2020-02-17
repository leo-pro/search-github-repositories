import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import Footer from '../../components/Footer';
import { Form, SubmitButton, List } from './styles';

class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    hasError: null,
  };

  componentDidMount() {
    const repositores = localStorage.getItem('repositories');

    if (repositores) {
      this.setState({ repositories: JSON.parse(repositores) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, hasError: null });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, hasError: null });

    try {
      const { newRepo, repositories } = this.state;

      // Verifica se campo repositorio está vazio
      if (newRepo === '') throw 'The field cannot be empty';

      // Verificar se o respositorio já foi add
      const hasRepo = repositories.find(r => r.name === newRepo);

      if (hasRepo) throw 'Repository already exists';

      const response = await api.get(`/repos/${newRepo}`);

      // Verificar se o repositorio existe
      if (!response.data) throw 'Please, insert a valid repository';

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (error) {
      this.setState({ hasError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, hasError } = this.state;

    return (
      <>
        <Container>
          <h1>
            <FaGithubAlt size={22} />
            Github Repositories
          </h1>

          <Form onSubmit={this.handleSubmit} error={hasError}>
            <input
              type="text"
              name="repo"
              placeholder="organization/repository-name"
              value={newRepo}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading}>
              {loading ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                <>
                  <FaPlus color="#fff" size={14} /> Add
                </>
              )}
            </SubmitButton>
          </Form>
          <span className="help-error">
            {hasError ? '* Invalid repository!' : ''}
          </span>
          <List>
            {repositories.map(repository => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Details
                </Link>
              </li>
            ))}
          </List>
        </Container>
        <Footer />
      </>
    );
  }
}

export default Main;
