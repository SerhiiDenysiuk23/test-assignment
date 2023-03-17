import React, {useState} from 'react';

const FormSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => setPhone(event.target.value);
    const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => setPosition(event.target.value);
    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPhoto(event.target.files[0]);
        }
    };

    return (
        <section className={"form-section container"}>
            <h1>Working with POST request</h1>

            <form className={"form"}>
                <input className={"form_text"} type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
                <input className={"form_text"} type="email" placeholder="Email" value={email}
                       onChange={handleEmailChange}/>
                <input className={"form_text"} type="tel" placeholder="Phone" value={phone}
                       onChange={handlePhoneChange}/>
                <div className={"form_radio-group"}>
                    <span>Select your position:</span>
                    <label>
                        <input className={"form_radio"} type="radio" name="position" value="position1"
                               checked={position === 'position1'}
                               onChange={handlePositionChange}/>
                        Frontend developer
                    </label>
                    <label>
                        <input className={"form_radio"} type="radio" name="position" value="position2"
                               checked={position === 'position2'}
                               onChange={handlePositionChange}/>
                        Backend developer
                    </label>
                    <label>
                        <input className={"form_radio"} type="radio" name="position" value="position3"
                               checked={position === 'position3'}
                               onChange={handlePositionChange}/>
                        Designer
                    </label>
                    <label>
                        <input className={"form_radio"} type="radio" name="position" value="position4"
                               checked={position === 'position4'}
                               onChange={handlePositionChange}/>
                        QA
                    </label>
                </div>
                <input className={"form_file"} type="file" accept="image/*" onChange={handlePhotoChange}/>

                <button disabled={true} className={"button"} type="submit">Sign up</button>
            </form>
        </section>
    );
};

export default FormSection;