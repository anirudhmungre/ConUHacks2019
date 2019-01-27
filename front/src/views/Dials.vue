<template>
    <v-container fill-height fluid>
        <v-dialog v-model="dialog" persistent max-width="400">
            <v-card>
                <v-card-title class="headline">Compare to Crop Ranges</v-card-title>
                <v-card-text>
                    Select a crop to compare the current values to the safety values of that crop.
                    <br><br>
                    <v-select v-model="vSelectCrop" :items="crops" box label="Select a crop"></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary darken-1" flat @click="cancelDialog">Cancel</v-btn>
                    <v-btn color="primary darken-1" flat @click="confirmDialog">Go</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout>
            <v-flex xs12>
                <v-card xs12>
                    <v-toolbar color="secondary" dark tabs>
                        <v-toolbar-title>Live Data <span v-if="selectedCrop !== null">for {{ selectedCrop }}</span></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="dialog = true">
                            <v-icon>search</v-icon>
                        </v-btn>
                        <v-tabs color="secondary" dark grow slot="extension" v-model="tab">
                            <v-tabs-slider color="black"></v-tabs-slider>
                            <v-tab>Temperature</v-tab>
                            <v-tab>Humidity</v-tab>
                            <v-tab>Pressure</v-tab>
                            <v-tab>Volumetric Water Content</v-tab>
                        </v-tabs>
                    </v-toolbar>
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <!--TEMP-->
                            <v-card flat>
                                <v-card-text>
                                    <v-sparkline padding="10" color="" :smooth="10" :line-width="2" :value="temperatureReading" auto-draw smooth stroke-linecap="round"></v-sparkline>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <!--HUMID-->
                            <v-card flat>
                                <v-card-text>
                                    <v-sparkline padding="10" color="" :smooth="10" :line-width="2" :value="humidityReading" auto-draw smooth stroke-linecap="round"></v-sparkline>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <!--PRESS-->
                            <v-card flat>
                                <v-card-text>
                                    <v-sparkline padding="10" color="" :smooth="10" :line-width="2" :value="pressureReading" auto-draw smooth stroke-linecap="round"></v-sparkline>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <!--VWC-->
                            <v-card flat>
                                <v-card-text>
                                    <ejs-lineargauge>
                                        <e-axes>
                                            <e-axis :ranges='ranges' maximum="100" minimum="0">
                                                <e-pointers>
                                                    <e-pointer color="green" value="10"></e-pointer>
                                                </e-pointers>
                                            </e-axis>
                                        </e-axes>
                                    </ejs-lineargauge>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'dials',
        data: () => ({
            tab: null,
            dialog: null,
            vSelectCrop: null,
            selectedCrop: null,
            temperatureReading: [],
            humidityReading: [],
            pressureReading: [],
            crops: ["Corn", "Soy Beans"],
            labelStyle: {
                format: '{value}'
            },
            ranges: [{
                start: 0,
                end: 40,
                startWidth: 15,
                endWidth: 15
            }, {
                start: 40,
                end: 60,
                startWidth: 15,
                endWidth: 15
            }, {
                start: 60,
                end: 70,
                startWidth: 15,
                endWidth: 15
            }, {
                start: 70,
                end: 100,
                startWidth: 15,
                endWidth: 15
            }]
        }),
        mounted() {
            this.temperatureReading = Array(35).fill(0).map(e => Math.random() * 100)
            this.humidityReading = Array(35).fill(0).map(e => Math.random() * 100)
            this.pressureReading = Array(35).fill(0).map(e => Math.random() * 50)
        },
        methods: {
            cancelDialog() {
                this.dialog = false
                this.vSelectCrop = this.selectedCrop
            },
            confirmDialog() {
                this.dialog = false
                this.selectedCrop = this.vSelectCrop
            }
        }
    }
</script>

<style>
    @import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
</style>