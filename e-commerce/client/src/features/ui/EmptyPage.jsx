function EmptyPage({ page, icon: Icon }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center calculatedHeight">
      {
        <Icon
          size={400}
          className=" text-primary position-relative opacity-25"
        />
      }
      <div className="position-absolute z-1">
        <h1 className="text-muted fw-bold">
          <span className="">{page}</span> Sayfanız Boş.
        </h1>
        <p className="text-muted fw-bold">
          {page} sayfanızdaki ürünleri görmek için lütfen önce ürün ekleyin.
        </p>
      </div>
    </div>
  );
}

export default EmptyPage;
