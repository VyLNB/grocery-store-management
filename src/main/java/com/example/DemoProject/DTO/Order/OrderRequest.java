package com.example.DemoProject.DTO.Order;


import java.util.List;

public class OrderRequest {

    private List<OrderItemRequest> items;
    private String paymentMethod;

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
