import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

export class ManageAuthorPage extends React.Component{
    constructor(props,context){
        super(props, context);
        
        this.state = {
            author: Object.assign({}, props.author),
            errors: {},
            saving: false
        };

        this.updateAuthor = this.updateAuthor.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.author.id !== nextProps.author.id) {
            this.setState({ author: Object.assign({}, nextProps.author) });
        }
    }

    updateAuthor(event){
        const field = event.target.name;
        let author = this.state.author;
        author[field] = event.target.value;
        return this.setState({ author: author });
    }

    isFormValid() {
        let formIsValid = true;
        let errors = {};
        
        if (this.state.author.firstName.length < 3) { 
            errors.firstName = 'First name must be at least 3 characters';
            formIsValid = false;
        }

        this.setState({ errors });
        return formIsValid;
    }

    saveAuthor(event) {
        event.preventDefault();

        if (!this.isFormValid()) {
            return; 
        }

        this.setState({ saving: true });
        this.props.actions.saveAuthor(this.state.author)
            .then(() => this.redirect()
            ).catch((error) => {
                this.setState({ saving: false });
                toastr.error(error);
            });        
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success("Author saved");
        this.context.router.push('/courses');
    }
    
    render()
    {
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.updateAuthor}
                onSave = {this.saveAuthor}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ManageAuthorPage.propTypes=
{
    author: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
    };

ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};


const getAuthorById = (authors, id) => {
    const author = authors.filter(author => author.id === id);
    if (author) return author[0];
    return null;
};

const mapStateToProps = (state, ownProps) => {
    const authorId = ownProps.params.id;

    let author = { id: '', firstName: '', lastName: ''};
    if (authorId && state.authors.length > 0) {
        author = getAuthorById(state.authors, authorId);
    }

    return {
        author
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ManageAuthorPage);
