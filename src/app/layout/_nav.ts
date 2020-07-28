export const navItems = [
    {
        name: 'Bảng tổng hợp',
        url: '/dashboard',
        icon: 'icon-speedometer'
    },
    {
        name: 'Giỏ hàng',
        url: '/cart',
        icon: 'fa fa-cart-plus'
    },
    {
        name: 'Đơn hàng',
        url: '/order',
        icon: 'fa fa-gavel',
        children: [
            {
                name: 'Tất cả',
                url: '/order/pet',
                icon: 'fa fa-chevron-right'
            },
            {
                name: 'Chờ báo giá',
                url: '/order/species',
                icon: 'fa fa-chevron-right'
            },
            {
                name: 'Chờ đặt cọc',
                url: '/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đang mua hàng',
                url: '/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đã mua hàng',
                url: '/order/breed',
                icon: 'fa fa-minus'
            },
            {
                name: 'Người bán giao',
                url: '/order/breed',
                icon: 'fa fa-minus'
            },
            {
                name: 'Kho THQC nhận',
                url: '/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Trên đường về VN',
                url: '/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Trong kho VN',
                url: '/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đang giao hàng',
                url: '/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đã trả hàng',
                url: '/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Thanh lý',
                url: '/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đơn hủy',
                url: '/order/breed',
                icon: 'fa fa-folder'
            }
        ]
    },
    {
        name: 'Kiện hàng',
        url: '/#',
        icon: 'fa fa-cubes',
    },
    {
        name: 'Ví điện tử',
        url: '/#',
        icon: 'fa fa-money',
    }
];
