const staticBackdropModalCode = `
<!-- Static Backdrop -->

const [modal_backdrop, setmodal_backdrop] = useState(false);

    function tog_backdrop() {
        setmodal_backdrop(!modal_backdrop);
    }

<Modal
    isOpen={modal_backdrop}
    toggle={() => {
        tog_backdrop();
    }}
    backdrop={'static'}
    id="staticBackdrop"
    centered
>
    <ModalHeader>
        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
        <Button type="button" className="btn-close"
            onClick={() => {
                setmodal_backdrop(false);
            }} aria-label="Close"></Button>
    </ModalHeader>
    <ModalBody className="text-center p-5">
        <div className="mt-4">
            <h4 className="mb-3">Update Your password to continue.</h4>
            <p className="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
            <div className="hstack gap-2 justify-content-center">
                <Link to="#" className="btn btn-link link-success fw-medium" onClick={() => setmodal_backdrop(false)}><i className="ri-close-line me-1 align-middle"></i> Close</Link>
                <Link to="#" className="btn btn-success">Completed</Link>
            </div>
        </div>
    </ModalBody>
</Modal>
`;

export const StaticBackdropModalExample = () => (
  <PrismCode
    code={staticBackdropModalCode}
    language={("js", "css", "html")}
    plugins={["line-numbers"]}
  />
);
