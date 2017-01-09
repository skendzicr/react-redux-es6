import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course,allAuthors, onSave,onChange,loading,errors}) => {
    return (
        <form>
        <h1>Manage Course</h1>
            <TextInput
                name="title"
                label="Title"
                value={course.title}
                onChange={onChange}
                error={errors.title}
            />
            <SelectInput
                name="authorId"
                label="authorId"
                value={course.authorId}
                defaultOption="Select Author"
                options={allAuthors}
                onChange={onChange}
                error={errors.authorId}
            />
            <TextInput
                name="category"
                label="category"
                value={course.category}
                onChange={onChange}
                error={errors.category}
            />
            <TextInput
                name="length"
                label="length"
                value={course.length}
                onChange={onChange}
                error={errors.length}
            />
            <input
                type="submit"
                disabled = {loading}
                value={loading ? "Saving...":"Save"}
                onClick={onSave}
                className = "btn btn-primary"
            />
        </form>
    );
};

CourseForm.propTypes = {
    course: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    allAuthors: React.PropTypes.array,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object    
};

export default CourseForm;