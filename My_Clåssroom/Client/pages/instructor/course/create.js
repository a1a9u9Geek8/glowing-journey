import {useState, useEffect} from 'react';

import axios from 'axios'
import InstructorRoute from "../com//"

const CreateCourse = () => {
// state
    const [values, setValue] = useState({
        name: '',
        description: '',
        price: '11.99',
        uploading: false,
        paid: true,
        loading: false,
        imagePreview: ''

    })

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    };
    const handleImage = {e} => {
        e.preventDefault();
        console,log(values);
    };

    const courseCreateForm = () => {
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" name="name" className="form-control" placeholder="Name" value={values.name} onChange={handleChange}/>
            </div>
        </form>

    }

    return(
        <InstructorRoute>
            <h1 className="jumbotron text-center square">Create Course</h1>
            <div className="pt-3 pb-3">
                {courseCreateForm()}
            </div>
        </InstructorRoute>
    );
};
export default CreateCourse;
