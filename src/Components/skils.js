import { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { APPLY_ACCTION, EDIT_ACCTION, UPDATE_ACTION } from '../constants/common';
import SearchFilter from './serachFilter';
import { ProfileContext } from '../App';



const SkilsList = (props) => {
    const { userData } = useContext(ProfileContext);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState([])
    const [filterType, setFilterType] = useState()

    const { saveData, checkValid } = props

    /** Remove row */
    const remove = (index) => {
        formData.splice(index, 1)
        setFormData([...formData])
        saveData(formData)
    }

    useEffect(() => {
        const setSkills = JSON.parse(JSON.stringify(userData.list));
        setFormData([...setSkills])
    }, [])

    /** validating formData   */
    useEffect(() => {
        if (!filterType) checkValid(formData)
    }, [formData])

    /** Add new row */
    const addRow = (data) => {
        setFormData([...formData, { skill: '', rating: '', isApply: true }])
        setFilterType("")

    }

    /** Set values on form fields */
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...formData];
        list[index][name] = value;
        setFormData(list);

    }

    /** Validation on Fields */
    const validateForm = (formData, index) => {
        let errors = [];
        if (!formData[index].skill.trim()) {
            errors[index] = { ...errors[index], skill: 'Skill is required' }
        }
        if (!formData[index].rating.trim()) {
            errors[index] = { ...errors[index], rating: 'Rating is required' }
        }
        return errors
    }

    /** Button actions on skill table */
    const buttonActions = (type, index) => {
        const newErrors = validateForm(formData, index);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return false
        }
        switch (type) {
            case 'Apply':
                formData[index].isApply = false;
                formData[index].isUpdate = true;
                saveData(formData)
                setFormData([...formData]);
                break;
            case 'Update':
                formData[index].isApply = false;
                formData[index].isUpdate = false;
                formData[index].isEdit = true;
                saveData(formData)
                setFormData([...formData]);
                break;
            case 'Edit':
                formData[index].isApply = false;
                formData[index].isUpdate = true;
                formData[index].isEdit = false;
                setFormData([...formData]);
                break;
            default:

        }

    }

    /** Serach Filter by type */
    const getFilterData = (e) => {

        if (e.target.name === 'type') {
            if (e.target.value === '1') {
                setFilterType('skill')
            } else {
                setFilterType('rating')
            }
        }
        if (e.target.name === 'value') {
            if (e.target.value === "") { setFormData(userData.list); return; }
            const filterBySearch = formData.filter((item) => {
                if (item[filterType].toString().toLowerCase()
                    .includes(e.target.value.toString().toLowerCase())) { return item; }
            })
            setFormData(filterBySearch);

        }
    }

    return (
        <>
            <SearchFilter type={filterType} onChange={getFilterData}></SearchFilter>
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.map((list, index) => <tr key={index} >
                        <td >
                            <input
                                type="text"
                                placeholder='Skill'
                                name='skill'
                                disabled={list.isEdit}
                                value={list.skill}
                                onChange={(e) =>
                                    handleChange(e, index)}
                                className='form-control form-control-sm'
                            />
                            {errors[index] && errors[index].skill &&
                                <span className='text-danger'>
                                    {errors[index].skill}

                                </span>

                            }
                        </td>
                        <td >
                            <input
                                type="number"
                                placeholder='Rating'
                                disabled={list.isEdit}
                                value={list.rating}
                                name='rating'
                                onChange={(e) =>
                                    handleChange(e, index)}
                                className="form-control form-control-sm"
                            />
                            {errors[index] && errors[index].rating &&
                                <span className='text-danger'>
                                    {errors[index].rating}

                                </span>
                            }
                        </td>
                        <td>

                            <div className="dropdown">
                                <a href="javascript:void(0)" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-three-dots-vertical"></i>
                                </a>
                                <ul className="dropdown-menu">
                                    {list.isApply && <li><a className="dropdown-item" href="javascript:void(0)" onClick={() => buttonActions(APPLY_ACCTION, index)}>Apply</a></li>}
                                    {list.isUpdate && <li ><a className="dropdown-item" href="javascript:void(0)" onClick={() => buttonActions(UPDATE_ACTION, index)} >Update</a></li>}
                                    <li><a className="dropdown-item" href="javascript:void(0)" onClick={() => remove(index)}>Remove</a></li>
                                    {list.isEdit && <li ><a className="dropdown-item" href="javascript:void(0)" onClick={() => buttonActions(EDIT_ACCTION, index)} >Edit</a></li>}

                                </ul>
                            </div>

                        </td>
                    </tr>

                    )}
                    {formData.length == 0 && <tr><td colSpan={3} className='text-center'>No Records Found</td></tr>}

                </tbody>
            </Table>
            <Button variant="outline-primary" className='col-7 bottom-0 position-absolute btn btn-outline-primary btn-sm' size="sm" onClick={addRow}>Add Skill</Button>
        </>
    )
}
export default SkilsList