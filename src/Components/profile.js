import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProfileModal from './modal';
import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../App';
import * as HTTP from '../service/http';

const Profiles = () => {
    const { userData, setUserData } = useContext(ProfileContext);
    const [isModalShow, setModalShow] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [index, setIndex] = useState(0)
    const close = (data) => {
        setModalShow(data)
    }

    useEffect(() => {
        HTTP.httpService('users?page=1&per_page=4', 'get', {}).then((res) => {
            if (res.success) {
                const { data } = res.data
                const imageArray = data.map(v => ({ ...v, list: [] }))
                setImageData(imageArray)
            }
        }, (error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (userData.length > 0) {
            imageData[index].list = userData
        }
        setImageData([...imageData])
    }, [userData])

    const editProfile = (data, index) => {
        setModalShow(true);
        setIndex(index)
        setUserData(data)
        //setProfile(data)
    }

    return (
        <>
            {imageData.map((item, index) => {
                return <Card key={index}>
                    <Card.Body>
                        <Card.Title><Card.Img style={{ width: '100px', height: '100px' }} variant="top" src={item.avatar} /></Card.Title>

                        <Button variant="outline-primary" onClick={() => editProfile(item, index)} size="sm">Edit Profile</Button>


                        <ul className="skill-list">
                            {item.list.map((item, index) => {
                                return <li key={index}>{item.skill}</li>
                            })}
                        </ul>

                    </Card.Body>
                </Card >
            })}
            <ProfileModal show={isModalShow} closePopup={() => close()}></ProfileModal>
        </>
    )

}
export default Profiles