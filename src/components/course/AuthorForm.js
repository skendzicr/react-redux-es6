import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onChange, onSave,saving,errors}) => {
    return (
        <form>
        <h1>Manage Author</h1>
            <TextInput
                name="id"
                label="Author ID"
                value={author.id}
                onChange={onChange}
                error={errors.id}
            />
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
                disabled = {saving}
                value={saving ? "Saving...":"Save"}
                onClick={onSave}
                className = "btn btn-primary"
            />
        </form>
    );
};

AuthorForm.propTypes = {
    author: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object    
};

export default AuthorForm;