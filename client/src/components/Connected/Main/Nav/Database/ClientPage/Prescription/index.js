const Prescription = ( {client} ) => {
    return (
        <section>
            <h1>Prescription</h1>
            <div>
                <p>{client.name}</p>
            </div>
        </section>
    )
}

export default Prescription;