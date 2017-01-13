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
            courses: [],
            errors: {},
            submitting: false
        };

        this.updateAuthor = this.updateAuthor.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.author && this.props.author.id !== nextProps.author.id) {
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

        this.setState({ submitting: true });
        this.props.actions.saveAuthor(this.state.author)
            .then(() => this.redirect('saved')
            ).catch((error) => {
                this.setState({ submitting: false });
                toastr.error(error);
            });        
    }

    authorHasCourse(authorId) {
        let authorHasCourse = false;
        let courses = this.props.courses;
        let errors = {};

        authorHasCourse = courses.filter(course => course.authorId === authorId).length !== 0;
        authorHasCourse ? errors.delete = "You cannot delete this author. He has assigned courses to him." : "";
        this.setState({ errors });
        return authorHasCourse;
    }

    deleteAuthor(event) {
        event.preventDefault();
        const {author} = this.state;
        if (this.authorHasCourse(author.id)) {
            toastr.error(`You cannot delete this author.
            He has assigned courses to him.
            `);            
        } else {
            this.props.actions.deleteAuthor(this.state.author)
                .then(() => this.redirect('deleted')
                ).catch((error) => {
                    toastr.error(error);
                });
        }

    }

    redirect(action) {
        this.setState({ submitting: false });
        toastr.success(`Author ${action}`);
        this.context.router.push('/courses');
    }
    
    render()
    {
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.updateAuthor}
                onSave = {this.saveAuthor}
                onDelete = {this.deleteAuthor}
                errors={this.state.errors}
                submitting={this.state.submitting}
            />
        );
    }
}

ManageAuthorPage.propTypes=
{
    author: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired

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
    let courses = state.courses;

    return {
        author,
        courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ManageAuthorPage);
