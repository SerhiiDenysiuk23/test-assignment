import React, {CSSProperties, useEffect, useState} from 'react';
import {getQuery, postQuery} from "../api/core";

interface Messages {
    name: string,
    email: string,
    phone: string
    position_id: string
    photo: string
}

const failsInit: Messages = {
    name: "",
    email: "",
    phone: "",
    position_id: "",
    photo: ""
}

const failStyleBorder: CSSProperties = {borderColor: "#CB3D40", borderWidth: 2}
const failStyleText: CSSProperties = {color: "#CB3D40"}

const FormSection = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [positionId, setPositionId] = useState<string>('');
    const [photo, setPhoto] = useState<File | null>(null);

    const helperTexts = {
        name: "",
        email: "",
        phone: "+38 (XXX) XXX - XX - XX",
        position_id: "",
        photo: ""
    }

    const [fails, setFails] = useState<Messages>(failsInit);
    const [isFiled, setIsFiled] = useState(false)

    const [successMsg, setSuccessMsg] = useState<string>("")

    const [token, setToken] = useState<string>("")

    const [positionList, setPositionList] = useState<{ id: number, name: string }[]>([])

    const validateForm = () => {
        setFails({
            position_id: "",
            name: name.length < 2
                ? 'The name must be at least 2 characters.'
                : name.length > 60
                    ? 'The name must not exceed 60 characters.'
                    : '',
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ? ''
                : 'The email must be a valid email address.',
            phone: /^[\+]{0,1}380([0-9]{9})$/.test(phone)
                ? ''
                : 'The phone number must be a valid.',
            photo: photo && !photo.type.startsWith('image/')
                ? 'Image is invalid'
                : photo && photo.size > 5 * 1024 * 1024
                    ? 'The photo may not be greater than 5 Mbytes.'
                    : ''
        });
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => setPhone(event.target.value);
    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => setPositionId(event.target.value);
    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPhoto(event.target.files[0]);
        }
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateForm()
    };

    useEffect(() => {
        const positionResp = getQuery("positions")
        const tokenResp = getQuery("token")

        positionResp.then((resp) => {
            setPositionList(resp.positions)
        })
        tokenResp.then((resp) => {
            setToken(resp.token)
        })
    }, [])

    useEffect(() => {
        setIsFiled(
            name.length != 0
            && email.length != 0
            && phone.length != 0
            && positionId.length != 0
            && photo != null
        )
    }, [name, email, phone, positionId, photo]);

    useEffect(() => {
        for (const fail in fails) {
            if (fail.length == 0) return;
        }
        if (photo == null) return

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("position_id", positionId.toString());
        formData.append("photo", photo);

        const response = postQuery(token, formData)
        response.then(resp => {
            if (resp.success)
                setSuccessMsg(resp.message)
            else if (resp?.fails)
                setFails({...failsInit, ...resp.fails})
            else
                console.error(resp.message)
        })
    }, [fails])

    return (
        <section className={"form-section container"}>
            {
                successMsg.length
                    ? <>
                        <h1>{successMsg}</h1>
                        <div className={"success-register"}>
                            <img src="./registered.png" alt="success image"/>
                        </div>
                    </>
                    : <>
                        <h1>Working with POST request</h1>
                        <form onSubmit={handleSubmit} className={"form"}>
                            <div className={"form_text form_fail"}>
                                {!!name.length && <div className={"form_text-label"}>Name</div>}
                                <input style={fails.name ? failStyleBorder : {}} type="text" placeholder="Name" value={name}
                                       onChange={handleNameChange}/>
                                <div style={fails.name ? failStyleText : {}}
                                     className={"form_message"}>{fails.name.length ? fails.name : helperTexts.name}</div>
                            </div>

                            <div className={"form_text"}>
                                {!!email.length && <div className={"form_text-label"}>Email</div>}
                                <input style={fails.email ? failStyleBorder : {}} type="text" placeholder="Email"
                                       value={email}
                                       onChange={handleEmailChange}/>
                                <div style={fails.email ? failStyleText : {}}
                                     className={"form_message"}>{fails.email.length ? fails.email : helperTexts.email}</div>
                            </div>

                            <div className={"form_text"}>
                                {!!phone.length && <div className={"form_text-label"}>Phone</div>}
                                <input style={fails.phone ? failStyleBorder : {}} type="text" placeholder="Phone"
                                       value={phone}
                                       onChange={handlePhoneChange}/>
                                <div style={fails.phone ? failStyleText : {}}
                                     className={"form_message"}>{fails.phone.length ? fails.phone : helperTexts.phone}</div>
                            </div>

                            <div className={"form_radio-group"}>
                                <span>Select your position:</span>
                                {
                                    positionList.map((item) => {
                                        return <div key={item.id} className={"form_radio"}>
                                            <input value={item.id} type="radio" name="position" id={'pos' + item.id}
                                                   onChange={handlePositionChange}/>
                                            <label className={"form_radio-label"}
                                                   htmlFor={'pos' + item.id}>{item.name}</label>
                                        </div>
                                    })
                                }
                            </div>

                            <div className="form_file-wrapper">
                                <label className={"form_file-label"} htmlFor="file-input">
                                    <div style={fails.photo ? failStyleBorder : {}}>Upload</div>
                                    <div
                                        style={fails.photo ? failStyleBorder : {}}>
                                        {photo == null ? "Upload your photo" :
                                            <span style={{color: "black"}}>{photo.name}</span>}
                                    </div>
                                </label>
                                <input id="file-input" type="file" accept="image/jpeg, image/jpg"
                                       onChange={handlePhotoChange}/>
                                <div style={fails.photo ? failStyleText : {}}
                                     className={"form_message"}>{fails.photo.length ? fails.photo : helperTexts.photo}</div>
                            </div>

                            <button disabled={!isFiled} className={"button"} type="submit">Sign up</button>
                        </form>
                    </>

            }

        </section>
    );
};

export default FormSection;