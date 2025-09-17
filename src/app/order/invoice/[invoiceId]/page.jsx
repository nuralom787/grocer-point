

const OrderInvoice = async ({ params }) => {
    const { invoiceId } = await params;

    return (
        <div>
            <h1>{invoiceId}</h1>
        </div>
    );
};

export default OrderInvoice;