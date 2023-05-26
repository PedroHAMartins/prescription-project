import '../../../../../../style/components/connected/main/options/_clientpage.sass';

const ClientPage = ({ client }) => {
    
    return (
        <section className='section__client-page'>
            <h1>Client's Page</h1>
            <div className='section__client-page__info'>
                <div className='section__client-page__info__all'>
                    <div className='section__client-page__info__all__divs'>
                        <h2 className='section__client-page__info__all__divs__h2'>Personal Information</h2>
                        <div>
                            <p>Name: {client.name}</p>
                            <p>Gender: {client.gender}</p>
                            <p>Email: {client.email}</p>
                            <p>Phone: {client.phone}</p>
                            <p>Address: {client.address}</p>
                            <p>Birthdate: {client.birthdate}</p>
                        </div>
                    </div>
                    <div>
                        <h2>Health Information</h2>
                        <div>
                            <p>Height: {client.infoHeight}cm</p>
                            <p>Weight: {client.infoWeight}kg</p>
                            <p>Allergies: {client.infoAllergies}</p>
                            <p>Patologies: {client.infoPatologies}</p>
                            <p>Objectives: {client.infoObjectives}</p>
                        </div>
                    </div>
                    <div>
                        <h2>Cardiology Information</h2>
                        <div>
                            <div>
                                <h3>Heart Rate</h3>
                                <div>
                                    <p>Min: {client.heartRateMin}</p>
                                    <p>Max: {client.heartRateMax}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Blood Pressure</h3>
                            <div>
                                <p>Pressure: {client.bloodPressure}</p>
                                <p>Classification: {client.bloodPressureClassification}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Body Analysis</h2>
                        <div>
                            <div>
                                <h3>Body Composition</h3>
                                <div>
                                    <p>Muscle: {client.compositionMuscle}</p>
                                    <p>Fat: {client.compositionFat}</p>
                                    <p>Bone: {client.compositionBone}</p>
                                </div>
                            </div>
                            <div>
                                <h3>Body Perimeters</h3>
                                <div>
                                    <p>Right Arm: {client.perimeterRightArm}</p>
                                    <p>Left Arm: {client.perimeterLeftArm}</p>
                                    <p>Right Forearm: {client.perimeterRightForearm}</p>
                                    <p>Left Forearm: {client.perimeterLeftForearm}</p>
                                    <p>Chest: {client.perimeterChest}</p>
                                    <p>Abdomen: {client.perimeterAbdomen}</p>
                                    <p>Hip: {client.perimeterHip}</p>
                                    <p>Right Thigh: {client.perimeterRightThigh}</p>
                                    <p>Left Thigh: {client.perimeterLeftThigh}</p>
                                    <p>Right Calf: {client.perimeterRightCalf}</p>
                                    <p>Left Calf: {client.perimeterLeftCalf}</p>
                                </div>
                            </div>
                            <div>
                                <h3>Skinfold Measures</h3>
                                <div>
                                    <p>Biceps: {client.measureBiceps}</p>
                                    <p>Triceps: {client.measureTriceps}</p>
                                    <p>Subscapular: {client.measureSubscapular}</p>
                                    <p>Suprailiac: {client.measureSuprailiac}</p>
                                    <p>Thigs: {client.measureThighs}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClientPage;