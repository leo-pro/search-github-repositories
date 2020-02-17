/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
import api from '../../services/api';

import Footer from '../../components/Footer';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Pagination, IssueFilter } from './styles';

export default class Repository extends Component {
  // static propTypes = {
  //   match: PropTypes.shape({
  //     params: PropTypes.shape({
  //       repository: PropTypes.string(),
  //     }),
  //   }).isRequired,
  // };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'All', active: true },
      { state: 'open', label: 'Open', active: false },
      { state: 'closed', label: 'Closed', active: false },
    ],
    filterIndex: 0,
    page: 1,
    numberOfPages: 0,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filter, numberOfPages } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`),
      {
        params: {
          state: filter,
          per_page: 5,
        },
      },
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const issueLength = await api.get(`/repos/${repoName}/issues`);
    this.setState({ numberOfPages: issueLength.data.length / 5 });

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilterClick = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadIssues();
  };

  handlePage = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });

    this.loadIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      filterIndex,
      page,
      numberOfPages,
    } = this.state;

    if (loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <>
        <Container>
          <Owner>
            <Link to="/">❮ Voltar aos repositórios</Link>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <IssueList>
            <IssueFilter active={filterIndex}>
              {filters.map((filter, index) => (
                <button
                  type="button"
                  key={filter.label}
                  onClick={() => this.handleFilterClick(index)}
                >
                  {filter.label}
                </button>
              ))}
            </IssueFilter>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt="" />
                <div>
                  <strong>
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {issue.title}
                    </a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
          <Pagination>
            <button
              type="button"
              disabled={page < 2}
              onClick={() => this.handlePage('back')}
            >
              ❮ Previous
            </button>
            <span>Page {page}</span>
            <button
              type="button"
              disabled={page >= numberOfPages}
              onClick={() => this.handlePage('next')}
            >
              Next ❯
            </button>
          </Pagination>
        </Container>
        <Footer />
      </>
    );
  }
}
