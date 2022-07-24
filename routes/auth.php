<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PaymentTypeController;
use App\Http\Controllers\RequestController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.update');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', [EmailVerificationPromptController::class, '__invoke'])
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');


    Route::get('client/register', [ClientController::class, 'create'])->name('client.register');
    Route::post('client/register', [ClientController::class, 'store']);
    Route::get('client', [ClientController::class, 'index'])->name('client.index');
    Route::get('client/{id}', [ClientController::class, 'show'])->name('client.show');
    Route::put('client/{id}', [ClientController::class, 'update'])->name('client.update');
    Route::delete('client/{id}', [ClientController::class, 'destroy'])->name('client.destroy');

    Route::get('product/register', [ProductController::class, 'create'])->name('product.register');
    Route::post('product/register', [ProductController::class, 'store']);
    Route::get('product', [ProductController::class, 'index'])->name('product.index');
    Route::get('product/{id}', [ProductController::class, 'show'])->name('product.show');
    Route::put('product/{id}', [ProductController::class, 'update'])->name('product.update');
    Route::delete('product/{id}', [ProductController::class, 'destroy'])->name('product.destroy');

    Route::get('paymentType/register', [PaymentTypeController::class, 'create'])->name('paymentType.register');
    Route::post('paymentType/register', [PaymentTypeController::class, 'store']);
    Route::get('paymentType', [PaymentTypeController::class, 'index'])->name('paymentType.index');
    Route::get('paymentType/{id}', [PaymentTypeController::class, 'show'])->name('paymentType.show');
    Route::put('paymentType/{id}', [PaymentTypeController::class, 'update'])->name('paymentType.update');
    Route::delete('paymentType/{id}', [PaymentTypeController::class, 'destroy'])->name('paymentType.destroy');
    
    Route::get('request', [RequestController::class, 'index'])->name('request.index');
    Route::get('request/register', [RequestController::class, 'create'])->name('request.register');
    Route::post('request/register', [RequestController::class, 'store']);
    Route::get('request/{id}', [RequestController::class, 'show'])->name('request.show');
    


    Route::get('request-today', [RequestController::class, 'requestsToday'])->name('request.requestsToday');
});
 