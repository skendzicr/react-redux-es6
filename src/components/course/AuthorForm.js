import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onChange, onSave,onDelete,submitting,errors}) => {
    return (
        <form>
        <h1>Manage Author</h1>
            <TextInput
                name="firstName"
                label="Name"
                value={author.firstName}
                onChange={onChange}
                error={errors.firstName}
            />
            <TextInput
                name="lastName"
                label="Last Name"
                value={author.lastName}
                onChange={onChange}
                error={errors.lastName}
            />
            <input
                type="submit"
                disabled = {submitting}
                value={submitting ? "Saving...":"Save"}
                onClick={onSave}
                className = "btn btn-primary"
            />
            <input
                type="submit"
                disabled = {submitting}
                value={"Delete"}
                onClick={onDelete}
                className = "btn btn-danger"
            />
        </form>
    );
};

AuthorForm.propTypes = {
    author: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool,
    errors: React.PropTypes.object    
};

export default AuthorForm;